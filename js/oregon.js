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
        this.teletype.print("Bar F00?").then(() => {
          this.teletype.print("Boo ya!").then(() => {
            this.teletype.print("Ya boy...").then(() => {
              this.teletype.print("Yeah yeah yeah").then(() => {
                this.teletype.print("Ja ja ja ja ja ja").then(() => {
                  this.teletype.print("Nah nah nah nah nah nah").then(() => {
                    this.teletype.print("Haben sie kopfschmerzen?").then(() => {
                      this.teletype.print("Callback heck").then(() => {
                        this.teletype.print("It's a little nuts").then(() => {
                          this.teletype.print("But what can you do?").then(() => {
                            this.teletype.print("Javascript crazy").then(() => {
                              this.teletype.print("Javascript crazy like a fox").then(() => {
                                this.teletype.print("Foxy scripting").then(() => {
                                  this.teletype.print("For Firefox").then(() => {
                                    this.teletype.print("FIRE!!!!!!").then(() => {
                                      this.teletype.print("Ready... Fire! Aim!").then(() => {
                                        this.playAgain();
                                        $(document).scrollTop(this.main[0].scrollHeight);
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
      this.teletype.container.append(button);
    }
  }
}