"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const cd = require("./cdCmd");
const cp = require("./cpCmd");
const ls = require("./lsCmd");
const mkdir = require("./mkdirCmd");
const mv = require("./mvCmd");
const touch = require("./touchCmd");
const pwd = require("./pwdCmd");
const rm = require("./rmCmd");

const rl = readline.createInterface({ input, output });

let exitConfirmationSignal = false;

function updatePromptDisplay() {
  if (exitConfirmationSignal) {
    rl.setPrompt("are you sure you want to exit (y/n)?");
  }
  const currentDirectory = process.cwd();
  rl.setPrompt(`fm :: ${currentDirectory} > `);
}

rl.on("close", () => {
  console.log("\nShutting down interface");
});

async function processCommand(line) {
  const lineSegments = line.trim().split(/\s+/);
  const command = lineSegments[0].toLowerCase();
  const args = lineSegments.slice(1);

  // switch statement to run commands
  switch (command) {
    case "cd":
      await cd(args);
      break;
    case "cp":
      await cp(args);
      break;
    case "mkdir":
      await mkdir(args);
      break;
    case "ls":
      await ls(path);
      break;
    case "pwd":
      pwd();
      break;
    case "mv":
      await mv(args);
      break;
    case "rm":
      await rm(args);
      break;
    case "touch":
      await touch(args);
      break;
    // error and default cases
    case "exit":
      rl.close();
      return;
    case "":
      break;
    default:
      if (command) {
        console.log(`Unknown command ${command}`);
      }
      break;
  }
}

rl.on("SIGINT", () => {
  if (exitConfirmationSignal) {
    console.log("\nExit confirmation cancelled");
    exitConfirmationSignal = false;
    updatePromptDisplay();
    rl.prompt();
  } else {
    exitConfirmationSignal = true;
    console.log("\nare you sure you want to close file manager? (y/n)");
    updatePromptDisplay();
    rl.prompt();
  }
});

async function main() {
  console.log("File Manager CLI started. Type exit to quit, or press Ctrl+c");

  updatePromptDisplay();
  rl.prompt();

  try {
    for await (const line of rl) {
      if (exitConfirmationSignal) {
        if (line.match(/^y(es)?$/i)) {
          rl.close();
        } else {
          console.log("continuing application");
          exitConfirmationSignal = false;
        }
      } else {
        await processCommand(line);
      }
      if (rl.closed) {
        break;
      }
      updatePromptDisplay();
      rl.prompt();
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    if (!rl.closed) {
      rl.close();
    }
  }
}

main().catch((err) => {
  console.error("Unhandled error during CLI execution:", err);
  process.exitCode = 1;
});
