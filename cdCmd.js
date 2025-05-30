"use strict";

const path = require("node:path");
const { chdir, cwd }  = require("node:process");
const { homedir} = require("node:os");
async function cdCmd(inputArg) {
	let targetPath;
	if (!inputArg || inputArg.length === 0 || inputArg[0] === "~") {	
		targetPath=(homedir());
	}
	else {
		targetPath = path.resolve(inputArg[0]);
	}
	const newPath = path.format({
		dir: cwd(), 
		base: inputArg[0]
	})
	try {
		await chdir(targetPath);
		return 0;
	} 
	catch (err) {
		console.error(`chdir: ${err}`);
	}
}

module.exports = cdCmd;
