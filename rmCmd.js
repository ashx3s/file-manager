"use strict";

const { rm } = require("node:fs/promises");

async function rmCmd(args) {
  if (!args || args.length === 0) {
    console.error("Usage: rm (optional flags -r) <file-to-be-removed>");
    return 1;
  }

  const recursive = args.includes("-r") || args.includes("-R");
  const force = args.includes("-f");
  const filesToRemove = args.filter((arg) => !arg.startsWith("-"));
  if (filesToRemove.length === 0) {
    console.error("No files specified for removal");
    return 1;
  }
  for (const filename of filesToRemove) {
    try {
      await rm(filename, { recursive, force });
    } catch (err) {
      if (err.code === "ENOENT") {
        console.error(`Error ${err.code}: ${filename} does not exist`);
      }
    }
  }
}

module.exports = rmCmd;
