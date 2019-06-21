import Htmletype from "./htmletype.js";

export default
  class OregonTrail {
  constructor() {
    this.main = $('main .row .col');
    this.teletype = new Htmletype(this.main);
  }

  play() {
    this.teletype.clear();
    this.teletype.print("Welcome to The Oregon Trail!").then(() => {
      this.teletype.print("Foo Bar!").then(() => {
        this.playAgain();
      });
    });
  }

  playAgain() {
    if (this.teletype.isPrinting) {
      setTimeout(() => this.playAgain(), 1);
    }
    else {
      const button = $("<button class='btn btn-primary'>Play Again</button>");
      button.click(() => this.play());
      this.teletype.container.append(button);
    }
  }
}