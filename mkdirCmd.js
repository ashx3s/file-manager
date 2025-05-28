"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const { cwd } = require("node:process");
async function mkdirCmd (args) {
	if (!args || args.length === 0) {
		console.log("Usage: mkdir <directory-name>");
		return false;
	}
	let allOperationsSuccess = true;

	for (const dirName of args) {
		const dirPath = path.resolve(cwd(), dirName);
		try {
			await fs.mkdir(dirPath);
			console.log(`Directory ${dirName} created at ${dirPath}`);
		}
		catch (err) {
			if (err.code === "EEXIST") {
				console.warn(`Directory ${dirName} already exists at ${dirPath}`)
			} else {
				console.error(`Error creating directory ${dirName}: ${err.message}`);
				allOperationsSuccess = false
			}
		}
	}
	return allOperationsSuccess
}

module.exports = mkdirCmd;
