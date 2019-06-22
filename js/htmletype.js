export default
  class HtmlTeletype {
  constructor($container) {
    this.$container = $container;
    this.buffer = [];
    this.$output = null;
    this.$input = null;
    this.$label = $("<label class='tt-label' for='tt-input'>Type your input (press Enter when done)</label>");
    this.$inputGroup = null;
    this.isPrinting = false;
    this.printSpeed = 25; //millis
    this.clear();
  }

  clear() {
    this.$container.children().remove();
  }

  startParagraph(cssClass) {
    this.$output = $("<p class='tt-output "+ cssClass + "'></p>");
    this.$container.append(this.$output);
  }

  print(msg, cssClass) {
    this.buffer = msg.split("");
    this.startParagraph(cssClass);
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
    this.$output.append(char);
    this.scrollToEnd();
  }

  input() {
    this.$input = $("<input id='tt-input' type='text' class='form-control form-control-lg'></input>");
    this.$inputGroup = $("<div></div").append(this.$input).append(this.$label);
    this.$container.append(this.$inputGroup);
    this.$input.focus();
    this.scrollToEnd();
    return new Promise((resolve, reject) => {
      this.$input.keypress((event) => {
        this.getInput(event, resolve, reject);
      });
    });
  }

  getInput(event, resolve, reject) {
    if (event.which === 13) {
      event.preventDefault();
      const input = this.$input.val();
      this.$inputGroup.remove();
      this.print(input, "user-input").then(() => {
        resolve(input);
      });
    }
  }

  scrollToEnd() {
    $(document).scrollTop(this.$container[0].scrollHeight);
  }
}