class HtmlTeletype {
  constructor($container) {
    this.container = $container;
    this.buffer = [];
    this.output = null;
    this.printing = false;
    this.printSpeed = 5; //millis

    this.container.children().remove();
    this.startParagraph();
  }

  startParagraph() {
    this.output = $("<p class='oregon-tt'></p>");
    this.container.append(this.output);
  }

  print(msg) {
    for (const char of msg) {
      this.buffer.push(char);
    }
    this.buffer.push("\n");
    this.printBuffer();
  }

  printBuffer() {
    if (!this.printing) {
      if (this.buffer.length > 0) {
        this.printing = true;
        setTimeout(this.printChar.bind(this), this.printSpeed);
      }
      else {
        this.printing = false;
      }
    }
  }

  printChar() {
    let char = this.buffer.shift();
    if (char === "\n") {
      this.startParagraph();
    }
    this.output.append(char);
    this.output.scrollTop(this.output[0].scrollHeight);
    this.printing = false;
    this.printBuffer();
  }
}

function playAgain(teletype) {
  if (teletype.printing) {
    setTimeout(() => playAgain(teletype), 1);
  }
  else {
    const button = $("<button class='btn btn-primary'>Play Again</button>");
    button.click(play);
    teletype.container.append(button);
  }
}

export const play = () => {
  const main = $('main .row .col');
  const teletype = new HtmlTeletype(main);
  teletype.print("Welcome to The Oregon Trail!");
  teletype.print("Foo Bar!");
  playAgain(teletype);
}