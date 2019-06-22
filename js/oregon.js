import Htmletype from "./htmletype.js";

export default
  class OregonTrail {
  constructor($main) {
    this.$main = $main;
    this.teletype = new Htmletype(this.$main);
  }

  play() {
    this.teletype.clear();
    this.teletype.print("Welcome to The Oregon Trail!").then(() => {
      this.teletype.print("Foo Bar!").then(() => {
        this.teletype.input().then((answer) => {
          this.teletype.print("Boo ya!").then(() => {
            this.teletype.input().then((answer) => {
              this.teletype.print("Yeah yeah yeah").then(() => {
                this.teletype.print("Ja ja ja ja ja ja").then(() => {
                  this.teletype.print("Nah nah nah nah nah nah").then(() => {
                    this.teletype.print("Haben sie kopfschmerzen?").then(() => {
                      this.teletype.input().then((answer) => {
                        this.teletype.print("You answered: " + answer).then(() => {
                          this.teletype.print("Callback heck").then(() => {
                            this.teletype.input().then((answer) => {
                              this.teletype.print("But what can you do?").then(() => {
                                this.teletype.print("Javascript crazy").then(() => {
                                  this.teletype.input().then((answer) => {
                                    this.teletype.print("Foxy scripting").then(() => {
                                      this.teletype.input().then((answer) => {
                                        this.teletype.print("FIRE!!!!!!").then(() => {
                                          this.teletype.print("Ready... Fire! Aim!").then(() => {
                                            this.playAgain();
                                            this.teletype.scrollToEnd();
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
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
      this.teletype.$container.append(button);
    }
  }
}