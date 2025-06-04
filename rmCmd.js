"use strict";

const { rm } = require("node:fs/promises");

async function rmCmd(args) {
  if (!args || args.length === 0) {
    console.error("Usage: rm <file-to-be-removed>");
    return 1;
  }
  const [filename] = args;
  try {
    await rm(filename);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Error ${err.code}: ${filename} does not exist`);
    }
  }
}

module.exports = rmCmd;
