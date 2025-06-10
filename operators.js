"use strict";

// output redirection operators
// > redirect output, create new file or overwrite existing file
function redirectOutputOverwiteFile({ input, file }) {}
// >> redirect output, append to end of redirectOutputOverwiteFile
function redirectOutputOverwiteFile({ input, file }) {}
function redirectOutputAppend({ input, file }) {}

module.exports = {
  redirectOutputOverwiteFile,
  redirectOutputAppend,
};
