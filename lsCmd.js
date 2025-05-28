"use strict";

const { readdir } = require("node:fs/promises");
const { cwd } = require("node:process");
const path = require("node:path");

async function lsCmd(inputArg) {
	let pathString;
	if (typeof inputArg === "string" && inputArg.trim() !== "") {
		pathString = path.resolve(ccwd(), inputArg.trim());
		console.log(`DEBUG: using provided path: ${pathString}`);
	} else {
		pathString = cwd();
	}
	console.log(`Attempting to read ${pathString}`);
	try {
		const files = await readdir(pathString);
		for (const file of files) {
			console.log(file);
		}
	} catch(err) {
		if (err.code === "ENOENT") {
			console.error(`Error: Directory not found - ${pathString}`);
		} else if (err.code === "ENOTDIR") {
			console.error(`Error: ${pathString} is not a directory`);
		} else if (err.code === "EACCES") {
			console.error(`Error: Permission denied - ${pathString}`);
		} else {
		console.error("List Directory Contents Error: ", err);
		}
	}
	
}

module.exports = lsCmd
