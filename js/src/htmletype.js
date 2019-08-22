export default
  class HtmlTeletype {
  constructor($container) {
    this.$container = $container;
    this.buffer = [];
    this.messageBuffer = [];
    this.$output = null;
    this.$input = null;
    this.$label = $("<label class='tt-label' for='tt-input'>Type your input (press Enter when done)</label>");
    this.$inputGroup = null;
    this.isPrinting = false;
    this.printSpeed = 1; //millis
    this.clear();
  }

  clear() {
    this.$container.children().remove();
  }

  startParagraph(cssClass) {
    this.$output = $("<p class='tt-output " + cssClass + "'></p>");
    this.$container.append(this.$output);
  }

  async printAll(messages) {
    for (const message of messages) {
      await this.print(message);
    }
  }

  print(message, cssClass) {
    this.buffer = message.split("");
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

  input(onlyNumeric) {
    onlyNumeric = false | onlyNumeric;
    this.$input = $("<input id='tt-input' type='text' class='form-control form-control-lg'></input>");
    this.$inputGroup = $("<div></div").append(this.$input).append(this.$label);
    this.$container.append(this.$inputGroup);
    this.$input.focus();
    this.scrollToEnd();
    return new Promise((resolve, reject) => {
      this.$input.keypress((event) => {
        this.getInput(event, resolve, reject, onlyNumeric);
      });
    });
  }

  getInput(event, resolve, reject, onlyNumeric) {
    if (event.which === 13) {
      event.preventDefault();
      const input = this.$input.val();
      this.$inputGroup.remove();
      this.print(input, "user-input").then(() => {
        resolve(input);
      });
    }

    // prevent anything but numbers being entered for onlyNumeric input
    // numeric characters = 0123456789.-
    if (onlyNumeric &&
      !(48 <= event.which && event.which <= 57) &&
      event.which !== 45 && event.which !== 46) {
      event.preventDefault();
    }
  }

  scrollToEnd() {
    $(document).scrollTop(this.$container[0].scrollHeight);
  }
}