"use strict";

const { writeFile } = require("node:fs/promises");
const { Buffer } = require("node:buffer");
async function touchCmd(args) {
  if (!args || args.length === 0) {
    console.error("Usage: touch <filename>");
    return 1;
  }
  const [filename] = args;

  try {
    const controller = new AbortController();
    const { signal } = controller;
    const data = new Uint8Array(Buffer.from(""));
    await writeFile(filename, data, { signal });
  } catch (err) {
    console.error(err);
  }
}

module.exports = touchCmd;
