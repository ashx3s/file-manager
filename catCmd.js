"use strict";
const fs = require("node:fs");

async function catCmd(args) {
  if (!args || args.length === 0) {
    console.warn("Usage: cat <file names...>");
    return;
  }

  const files = args;
  console.log(files);
  // iterate through the args
  for (const file of files) {
    try {
      // error handle to make sure the input is actually files
      if (!fs.accessSync(file, fs.constants.R_OK)) {
        console.error(`cat: ${file}: No such file or directory`);
      }
      await new Promise((resolve, reject) => {
        // read file in a stream
        const readStream = fs.createReadStream(file, "utf-8");
        readStream.on("data", (chunk) => {
          process.stdout.write(chunk);
        });

        readStream.on("error", (err) => {
          console.error(`cat: ${file}: ${err.message}`);
          reject();
        });

        readStream.on("end", () => resolve());
      });
    } catch (err) {
      console.error("Error: ", err.code, err.message);
    }
  }
}

module.exports = catCmd;
