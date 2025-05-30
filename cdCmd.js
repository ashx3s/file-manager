"use strict";

const path = require("node:path");
const { chdir, cwd }  = require("node:process");
const { homedir } = require("node:os");

async function cdCmd(inputArg) {
	let targetPath;

	if (!inputArg || inputArg.length === 0 || inputArg[0] === "~") {	
		targetPath=(homedir());
	} else if (inputArg[0].startsWith("~/")) {
		targetPath = path.join(homedir(), inputArg[0].substring(2));
	}
	else {
		targetPath = path.resolve(inputArg[0]);
	}

	try {
		await chdir(targetPath);
		return 0;
	} 
	catch (err) {
		let errorMessage = `cd: Error changing directory to "${targetPath}"`;
		if (err.code === "ENOENT") {
			errorMessage += `: No such file or directory`;
		} else if (err.code === "") {
			errorMessage += `: Not a directory`;
		} else {
			errorMessage += `: ${err.message}`;
		}
		console.error(errorMessage);
		return 1;
	}
}

module.exports = cdCmd;
