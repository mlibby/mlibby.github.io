"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import OregonTrail from "../oregon.js";

const template = (d) => html`
  <div class="row">
    <div class="col">
      <section id="oregon-trail">  
        <h2>Play the Original Oregon Trail Game</h2>
        <p>
          Many people grew up with the computer game "<a
            href="https://en.wikipedia.org/wiki/The_Oregon_Trail_(series)">The Oregon Trail</a>" by
          <a href="https://en.wikipedia.org/wiki/MECC">MECC</a>. Feeling nostalgic? You can buy a <a
            href="https://smile.amazon.com/The-Oregon-Trail-Handheld-Game/dp/B07B61BFSW/">handheld
            gadget</a> in stores that has an early version of the game on it (often incorrectly referred to as the
          "original" version) or you can download an <a
            href="https://www.thefreecountry.com/emulators/apple-2.shtml">Apple II emulator</a> and a <a
            href="https://archive.org/details/Oregon_Trail_Disk_1_of_2">virtual disk of
            the game</a>.
        </p>
        <p>
          BUT that isn't the <em>original</em> version of the game! My first computer was actually in a
          room across town from school and we used a teletype to connect to it (<a
            href="https://en.wikipedia.org/wiki/Teletype_Model_33">read more</a>). There was no screen, it was just a
          typewriter with a really long roll of paper. The computer printed some stuff out, you typed some stuff in,
          back and forth... just letters and numbers on paper. It was on a system like that when I first fell in love
          with the game "The Oregon Trail".
        </p>
        <p>
          So this is my attempt to recreate that original version of "The Oregon Trail".
          There are no graphics. Whenever the computer has printed out its part, you will get an
          input box for your response. Just type into it and press Enter/Return. If the program is
          expecting a number, you will only be able to type numbers into the box.
        </p>
        <p>
          Please enjoy! If you are interested, here is <a href="#why-and-how-oregon">an essay with more background on
            why and how </a> I put this together.
        </p>
        <button class="play-oregon btn btn-primary">Play The Oregon Trail</button>
      </section>
    </div>
  </div>
`;

export default class OregonView extends Backbone.View {
  preinitialize() {
    this.events = {
      "click .play-oregon": "play",
    };
  }

  play() {
    const $app = $('#app');
    const oregonTrail = new OregonTrail($app);
    oregonTrail._160_play();
 }
  
  render() {
    render(template(), this.el);
    return this;
  }
}
