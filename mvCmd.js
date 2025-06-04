"use strict";

const { rename } = require("node:fs/promises");

async function mvCmd(args) {
  if (!args || args.length === 0) {
    console.log("Usage: mv <src-file> <destination>");
    return false;
  }
  const [srcFile, destFile] = args;

  try {
    await rename(srcFile, destFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`${err.code}: the input file does not exist`, err.message);
    } else {
      console.error(`${err.code}: Error Copying file`, err.message);
    }
  }
}

module.exports = mvCmd;
