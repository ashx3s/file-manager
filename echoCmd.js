"use strict";

async function echoCmd(args) {
  if (!args || !args.length) {
    console.error("No arguments provided");
    return;
  }
  console.log(args.join(" "));
  return args.join(" ");
}

module.exports = echoCmd;
