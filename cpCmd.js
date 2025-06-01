"use strict";

const { copyFile, constants } = require("node:fs/promises")

async function cpCmd (args) {
	if (!args || args.length === 0) {
		console.log("Usage: cp <source-file> <destination-file>");
		return false;
	}
	const [srcFile, destFile] = args;

	try {
		await copyFile(srcFile, destFile);

		console.log(`Copied: ${srcFile} to ${destFile}`);
	} catch (err) {
		if (err.code === "ENOENT") {
			console.error(`${err.code}: the input file does not exist`, err.message);
		} else {
			console.error(`Error Copying File`, err.code);
		}
	}
}

module.exports = cpCmd
