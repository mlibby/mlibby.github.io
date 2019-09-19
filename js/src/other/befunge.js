
const befungeVector = {
  n: { xd: 0, yd: -1 },
  e: { xd: 1, yd: 0 },
  s: { xd: 0, yd: 1 },
  w: { xd: -1, yd: 0 }
};

export default
  class Befunge {
  constructor() {
    this.setDefaults();

    this.height = 25;
    this.width = 80;
    this.rawText = "";
    this.parsedText = "";
    this.interval = null;

    this.befunctions = {
      // Directional
      'v': () => { this.vector = befungeVector.s; },
      '^': () => { this.vector = befungeVector.n; },
      '<': () => { this.vector = befungeVector.w; },
      '>': () => { this.vector = befungeVector.e; },
      '?': () => { this.vector = this.getRandomVector(); },
      '_': () => { this.switchVector(befungeVector.e, befungeVector.w); },
      '|': () => { this.switchVector(befungeVector.s, befungeVector.n); },
      '#': () => { this.moveCursor(); },

      // Mode
      '"': () => { this.stringMode = true; },
      '@': () => { this.halt(); },

      // Numerical Entry
      '0': () => { this.push(0); },
      '1': () => { this.push(1); },
      '2': () => { this.push(2); },
      '3': () => { this.push(3); },
      '4': () => { this.push(4); },
      '5': () => { this.push(5); },
      '6': () => { this.push(6); },
      '7': () => { this.push(7); },
      '8': () => { this.push(8); },
      '9': () => { this.push(9); },

      // Stack manipulation
      '!': () => { this.logicalNot(); },
      ':': () => { this.duplicate(); },
      '\\': () => { this.swap(); },
      '$': () => { this.pop(); },
      'g': () => { this.get(); },
      'p': () => { this.put(); },

      // I/O
      ',': () => { this.printChar(); },
      '.': () => { this.printNumber(); },
      '&': () => { this.getNumber(); },
      '~': () => { this.getChar(); },

      // Math
      '+': () => { this.add(); },
      '-': () => { this.subtract(); },
      '/': () => { this.divide(); },
      '*': () => { this.multiply(); },
      '%': () => { this.modulo(); },
      '`': () => { this.compare(); }
    };
  }

  getNumber() {
    this.numberString = "";
    this.stop();
    this.$console.addClass("befunge-get-number");
    this.$console.focus();
    this.$console.on('keypress', (e) => { this.readNumber(e); });
  }

  readNumber(e) {
    const val = String.fromCharCode(e.which || e.keyCode);
    if (val === " ") {
      this.$console.val(this.$console.val() + val);
      this.push(Number(this.numberString));
      this.$console.off('keypress');
      this.$console.removeClass("befunge-get-number");
      this.run();
    }
    else {
      if (val === "-" || (val >= "0" && val <= "9")) {
        this.numberString = this.numberString + val;
        this.$console.val(this.$console.val() + val);
      }
    }
  }

  printNumber() {
    let outputText = this.$console.val();
    outputText = outputText + this.pop().toString() + " ";
    this.printToConsole(outputText);
  }

  printToConsole(outputText) {
    this.$console.val(outputText);
    this.$console.scrollTop(this.$console[0].scrollHeight - this.$console.height());
  }

  getChar() {
    this.stop();
    this.$console.addClass("befunge-get-char");
    this.$console.focus();
    this.$console.on('keypress', (e) => { this.readChar(e); });
  }

  readChar(e) {
    this.push(String.fromCharCode(e.which || e.keyCode));
    this.$console.off('keypress');
    this.$console.removeClass("befunge-get-char");
    this.run();
  }

  printChar() {
    let outputText = this.$console.val();
    const outputCharCode = this.pop();
    outputText = outputText + String.fromCharCode(outputCharCode);

    this.printToConsole(outputText);
  }

  duplicate() {
    const value = this.pop();
    this.push(value);
    this.push(value);
  }

  swap() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(rhs);
    this.push(lhs);
  }

  push(val) {
    this.stack.push(val);
  }

  pop() {
    if (this.stack.length > 0) {
      return this.stack.pop();
    } else {
      return 0;
    }
  }

  put() {
    const y = this.pop();
    const x = this.pop();
    let val = Number(this.pop());

    const id = this.getTorusId(x, y);
    if (id !== "oob") {
      const $cell = $("#" + id);
      $cell.val("=");
      $cell.attr("title", val);
    }
  }

  get() {
    const y = this.pop();
    const x = this.pop();
    const id = this.getTorusId(x, y);

    let val = 0;
    if (id !== "oob") {
      const cell = this.torus[y][x]; //$("#" + id);
      //val = cell.val();
      if (cell === "=") {
        val = Number(cell.attr("title"));
      }
      else if (val === "") {
        val = 0;
      }
      else {
        val = val.charCodeAt(0);
      }
    }

    this.push(val);
  }

  switchVector(zeroVector, elseVector) {
    const switchVal = this.pop();
    if (switchVal === 0 || switchVal === undefined) {
      this.vector = zeroVector;
    }
    else {
      this.vector = elseVector;
    }
  }

  add() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(lhs + rhs);
  }

  subtract() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(lhs - rhs);
  }

  divide() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(Math.floor(lhs / rhs));
  }

  multiply() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(lhs * rhs);
  }

  modulo() {
    const rhs = this.pop();
    const lhs = this.pop();
    this.push(lhs % rhs);
  }

  logicalNot() {
    const value = this.pop();
    this.push(value === 0 ? 1 : 0);
  }

  compare() {
    const rhs = this.pop();
    const lhs = this.pop();
    const val = lhs > rhs ? 1 : 0;
    this.push(val);
  }

  readFile() {
    const file = $("#befunge-file")[0].files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => { this.loadBefunge(e); };
      fileReader.readAsText(file);
      $("#file-name").val(file.name);
    }
    else {
      alert("Failed to load file");
    }
  }

  loadBefunge(e) {
    this.rawText = e.target.result;
    this.parseText();
    this.drawTorus();
  }

  parseText() {
    let x = 0;

    this.parsedText = "";

    for (var idx = 0; idx < this.rawText.length; idx++) {
      var chr = this.rawText.charCodeAt(idx);
      if (chr === 10) {
        while (x < this.width) {
          this.parsedText = this.parsedText + " ";
          x++;
        }

        x = 0;
      }
      else if (chr !== 13) {
        this.parsedText = this.parsedText + this.rawText.charAt(idx);
        x++;
      }

    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomVector() {
    return [befungeVector.n, befungeVector.s, befungeVector.e, befungeVector.w][this.getRandomInt(0, 3)];
  }

  getTorusId(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return "oob";
    }
    else {
      return "cell-" + x + "-" + y;
    }
  }

  drawTorus() {
    this.torus = [];
    this.$torus.children().remove();
    for (var y = 0; y < this.height; y++) {
      const torusRow = [];
      const $torusRow = $("<div class='torus-row'></div>");
      for (var x = 0; x < this.width; x++) {
        const $input = $("<input id='" + this.getTorusId(x, y) + "' type='text' maxlength='1' />");
        const idx = y * this.width + x;
        $input.val(this.parsedText.charAt(idx));
        $torusRow.append($input);
        const cell = [0];
        torusRow.push(cell);
      }

      this.$torus.append($torusRow);
      this.torus.push(torusRow);
    }
  }

  getCurrentCell() {
    return this.torus[this.y][this.x];
    //return $("#" + this.getTorusId(this.x, this.y));
  }

  activateCurrentCell() {
    $(".torus-row").children().removeClass("active-cell");
    this.getCurrentCell().addClass("active-cell");
  }

  doStringMode(currentVal) {
    if (currentVal === '"') {
      this.stringMode = false;
    }
    else {
      this.push(currentVal.charCodeAt(0));
    }
  }

  doNonStringMode(currentVal) {
    if (this.befunctions[currentVal] !== undefined) {
      this.befunctions[currentVal]();
    }
  }

  doCurrentCell() {
    var currentCell = this.getCurrentCell();

    if (currentCell.hasClass("befunge-breakpoint")) {
      this.breakpointed = true;
    }

    var currentVal = currentCell.val();

    if (this.breakpointed) {
      this.breakpointed = false;
    }

    if (this.stringMode) {
      this.doStringMode(currentVal);
    }
    else {
      this.doNonStringMode(currentVal);
    }
  }

  showStack() {
    const stackMode = this.$stackMode.val();
    var stackText = "";
    for (var sdx = 0; sdx < this.stack.length; sdx++) {
      var charCode = this.stack[sdx];
      var addChar;
      if (stackMode === "asc") {
        if (32 <= charCode && charCode <= 126) {
          addChar = String.fromCharCode(charCode);
        }
        else {
          addChar = ("00" + charCode.toString(10)).substr(-3, 3);
        }
      }
      else if (stackMode === "dec") {
        addChar = charCode;
      }
      else { ///stackmode === "hex"
        addChar = ("0" + charCode.toString(16)).substr(-2, 2);
      }

      stackText = stackText + addChar + " ";
    }

    this.$stack.val(stackText);
  }

  moveCursor() {
    if (!this.halted && !this.breakpointed) {
      this.x = this.x + this.vector.xd;
      this.y = this.y + this.vector.yd;

      if (this.x >= this.width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = this.width - 1;
      }

      if (this.y >= this.height) {
        this.y = 0;
      }
      else if (this.y < 0) {
        this.y = this.height - 1;
      }
    }
  }

  oneStep() {
    this.doCurrentCell();
    this.moveCursor();
    if (this.debug) {
      this.activateCurrentCell();
      this.showStack();
    }
  }

  runLoop() {
    if (this.running) {
      this.oneStep();
      setTimeout(() => this.runLoop(), this.intervalMS);
    }
  }

  run() {
    if (!this.halted) {
      this.running = true;
      this.runLoop();
    }
  }

  stop() {
    this.running = false;
  }

  halt() {
    this.stop();
    this.halted = true;
  }

  setDefaults() {
    this.x = 0;
    this.y = 0;
    this.stack = [];
    this.numberString = "";
    this.stringMode = false;
    this.running = false;
    this.halted = false;
    this.vector = befungeVector.e;
    this.intervalMS = 0;
    this.debug = false;
  }

  reset() {
    this.stop();
    this.setDefaults();
    this.showStack();
    this.activateCurrentCell();
  }

  clearConsole() {
    this.$console.val("");
  }

  slower() {
    if (this.intervalMS < 2048) {
      this.newSpeed(this.intervalMS * 2);
    }
  }

  faster() {
    if (this.intervalMS > 1) {
      this.newSpeed(this.intervalMS / 2);
    }
  }

  newSpeed(newIntervalMS) {
    const hasInterval = this.interval !== null;
    if (hasInterval) {
      clearInterval(this.interval);
    }

    this.intervalMS = newIntervalMS;

    if (hasInterval) {
      this.interval = setInterval(() => { this.oneStep(); }, this.intervalMS);
    }
  }


}
