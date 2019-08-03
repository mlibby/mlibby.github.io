"use strict";

export default
  class TuringMachine {
  constructor(mConfig) {
    this.mConfig = mConfig.split("\n");
    this.parseMConfig();
  }

  parseMConfig() {
    this.byteCode = {};
    let lineNumber = 0;
    while (lineNumber < this.mConfig.length) {
      this.parseLine(lineNumber);
      lineNumber++;
    }
  }

  parseLine(lineNumber) {
    const line = this.mConfig[lineNumber];
    const tokens = line.trim().split(" ");

    if (tokens.length !== 4) {
      throw new Error("Syntax Error, Line " + (lineNumber + 1));
    }

    const config = tokens[0];
    const match = tokens[1];
    const command = tokens[2];
    const nextConfig = tokens[3];

    this.byteCode[config] = {};
    this.byteCode[config][match] = [command.split(","), nextConfig];
  }
}