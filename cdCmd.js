"use strict";

const path = require("node:path");
const { chdir, cwd }  = require("node:process");

async function cdCmd(inputArg) {
	// validate path
	if (!inputArg) {
		return 0;
	}
	// get current path
	const newPath = path.format({
		dir: cwd(), 
		base: inputArg[0]
	})

	try {
		await chdir(newPath);
		console.log(`Current Directory: ${cwd()}`);
	} 
	catch (err) {
		console.error(`chdir: ${err}`);
	}
}

module.exports = cdCmd;
