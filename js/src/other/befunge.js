"use strict";

const loopMessage = "run-loop-message";

const vector = {
  n: { x: 0, y: -1 },
  e: { x: 1, y: 0 },
  s: { x: 0, y: 1 },
  w: { x: -1, y: 0 }
};

export default class Befunge {

  static get height() { return 25; }

  static get width() { return 80; }

  constructor(program, callbacks) {
    this.setDefaults();
    this.initOperations();
    this.initCallbacks(callbacks);
    this.createTorus();
    this.parseProgram(program);

    window.addEventListener("message", (e) => { this.runLoop(e); }, true);
  }

  setDefaults() {
    this.x = 0;
    this.y = 0;
    this.stack = [];
    this.stringMode = false;
    this.running = false;
    this.halted = false;
    this.vector = vector.e;
    this.debugging = false;
  }

  initOperations() {
    this.operations = {
      // Default cell state is NO-OP
      ' ': () => { },

      // Directional
      'v': () => { this.vector = vector.s; },
      '^': () => { this.vector = vector.n; },
      '<': () => { this.vector = vector.w; },
      '>': () => { this.vector = vector.e; },
      '?': () => { this.vector = this.randomVector(); },
      '_': () => { this.conditionalVector(vector.e, vector.w); },
      '|': () => { this.conditionalVector(vector.s, vector.n); },
      '#': () => { this.bridge(); },

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
      ',': () => { this.outputChar(); },
      '.': () => { this.outputNumber(); },
      '&': () => { this.inputNumber(); },
      '~': () => { this.inputChar(); },

      // Math
      '+': () => { this.add(); },
      '-': () => { this.subtract(); },
      '/': () => { this.divide(); },
      '*': () => { this.multiply(); },
      '%': () => { this.modulo(); },
      '`': () => { this.compare(); }
    };
  }

  initCallbacks(callbacks) {
    this.cellChanged = callbacks.cellChanged || (() => { });
    this.pcChanged = callbacks.pcChanged || (() => { });
    this.printed = callbacks.printed || (() => { });
  }

  createTorus() {
    this.height = 25;
    this.width = 80;
    this.torus = Array(this.height * this.width);

    for (var i = 0; i < this.height * this.width; i++) {
      this.torus[i] = 32; // ASCII space " " character
    }
  }

  parseProgram(program) {
    let x = 0;
    let y = 0;

    for (var idx = 0; idx < program.length; idx++) {
      var chr = program.charCodeAt(idx);
      if (chr === 10) {
        x = 0;
        y++;
      }
      else if (chr !== 13) {
        this.setCell(x, y, chr);
        x++;
        if (x == this.width) {
          x = 0;
          y++;
        }
      }

    }
  }

  getCell(x, y) {
    return this.torus[y * this.width + x];
  }

  setCell(x, y, value) {
    this.torus[y * this.width + x] = value;
    this.cellChanged(x, y, value);
  }

  getCurrentCell() {
    return this.getCell(this.x, this.y);
  }

  inputNumber() {
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

  inputChar() {
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

  outputNumber() {
    const output = this.pop().toString() + " ";
    this.printed(output);
  }

  outputChar() {
    const output = String.fromCharCode(Number(this.pop()));
    this.printed(output);
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
    const val = Number(this.pop());
    this.setCell(x, y, val);
  }

  get() {
    const y = this.pop();
    const x = this.pop();
    const val = this.getCell(x, y);
    this.push(val);
  }

  conditionalVector(zeroVector, elseVector) {
    const switchVal = this.pop();
    if (switchVal === 0 || switchVal === undefined) {
      this.vector = zeroVector;
    }
    else {
      this.vector = elseVector;
    }
  }

  bridge() {
    this.moveProgramCounter(false);
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomVector() {
    return [vector.n, vector.s, vector.e, vector.w][this.getRandomInt(0, 3)];
  }

  doStringMode(currentVal) {
    const currentChar = String.fromCharCode(currentVal);
    if (currentChar === '"') {
      this.stringMode = false;
    }
    else {
      this.push(currentVal);
    }
  }

  doNonStringMode(currentVal) {
    const currentChar = String.fromCharCode(currentVal);
    if (this.operations[currentChar] !== undefined) {
      this.operations[currentChar]();
    }
  }

  doCurrentCell() {
    let currentVal = this.getCurrentCell();

    // if (currentCell.hasClass("befunge-breakpoint")) {
    //   this.breakpointed = true;
    // }

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



  moveProgramCounter(doCallback = true) {
    if (!this.halted && !this.breakpointed) {
      this.x = this.x + this.vector.x;
      this.y = this.y + this.vector.y;

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

      if(doCallback) {
        this.pcChanged(this.x, this.y);
      }
    }
  }

  oneStep() {
    this.doCurrentCell();
    this.moveProgramCounter();
    if (this.debug) {
      this.activateCurrentCell();
      this.showStack();
    }
  }

  runLoop(e) {
    if (e.source == window && e.data === loopMessage) {
      e.stopPropagation();

      if (this.running) {
        this.oneStep();

        if (this.debugging) {
          setTimeout(() => window.postMessage(loopMessage, "*"), 16);
        }
        else {
          window.postMessage(loopMessage, "*");
        }
      }
    }
  }

  run() {
    if (!this.halted) {
      this.running = true;
      window.postMessage(loopMessage, "*");
    }
  }

  stop() {
    this.running = false;
  }

  halt() {
    this.stop();
    this.halted = true;
  }

  toggleDebug() {
    this.debugging = !this.debugging;
  }

  reset() {
    this.stop();
    this.setDefaults();
    //this.showStack();
    //this.activateCurrentCell();
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
