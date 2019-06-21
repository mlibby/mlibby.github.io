export default
  class HtmlTeletype {
  constructor($container) {
    this.container = $container;
    this.buffer = [];
    this.output = null;
    this.isPrinting = false;
    this.printSpeed = 5; //millis
    this.clear();
  }

  clear() {
    this.container.children().remove();
  }

  startParagraph() {
    this.output = $("<p class='oregon-tt'></p>");
    this.container.append(this.output);
  }

  print(msg) {
    this.buffer = msg.split("");
    this.startParagraph();
    return new Promise((resolve, reject) => {
      this.printBuffer(resolve, reject);
    });
  }

  printBuffer(resolve, reject) {
    if (this.buffer.length > 0) {
      this.printChar();
      setTimeout(() => this.printBuffer(resolve, reject), this.printSpeed);
    }
    else {
      resolve();
    }
  }

  printChar() {
    let char = this.buffer.shift();
    this.output.append(char);
    this.output.scrollTop(this.output[0].scrollHeight);
  }
}