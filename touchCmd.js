"use strict";

const { writeFile } = require("node:fs/promises");
const { Buffer } = require("node:buffer");
async function touchCmd(args) {
  if (!args || args.length === 0) {
    console.error("Usage: touch <filename...>");
    return 1;
  }
  const files = args;
  for (const filename of files) {
    try {
      const controller = new AbortController();
      const { signal } = controller;
      const data = new Uint8Array(Buffer.from(""));
      await writeFile(filename, data, { signal });
      console.log(`Created: ${filename}`);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = touchCmd;
