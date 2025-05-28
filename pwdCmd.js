"use strict";

const { cwd } = require("node:process");

function pwdCmd() {
	console.log(`Present Working Directory: ${cwd()}`);
}

module.exports = pwdCmd
