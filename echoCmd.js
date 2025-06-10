"use strict";

function echoCmd(args) {
  if (!args || !args.length) {
    console.warn("Usage: echo <input>...");
    return;
  }
  console.log(args.join(" "));
  process.stdout.write(args.join(" "));
}

module.exports = echoCmd;
