"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import OregonTrail from "../oregon.js";

const template = (d) => html`
  <div class="row">
    <div class="col">
      <section id="oregon-trail">
        <h2>The Story Behind My Remake of Oregon Trail</h2>
        <p>
          Many people grew up with the computer game "<a href="https://en.wikipedia.org/wiki/The_Oregon_Trail_(series)">The
            Oregon Trail</a>" by
          <a href="https://en.wikipedia.org/wiki/MECC">MECC</a>. If you are feeling nostalgic you can buy a <a href="https://smile.amazon.com/The-Oregon-Trail-Handheld-Game/dp/B07B61BFSW/">handheld
            gadget</a> in stores that has an early version of the game on it (often incorrectly referred to as the
          "original" version) or you can download an <a href="https://www.thefreecountry.com/emulators/apple-2.shtml">Apple
            II emulator</a> and a <a href="https://archive.org/details/Oregon_Trail_Disk_1_of_2">virtual disk of
            the game</a>.
        </p>
        <p>
          BUT that isn't the <em>original</em> version of the game! My first computer was actually in a
          room across town from school and we used a teletype to connect to it (<a href="https://en.wikipedia.org/wiki/Teletype_Model_33">read
            more</a>). There was no screen, it was just a
          typewriter with a really long roll of paper. The computer printed some stuff out, you typed some stuff in,
          back and forth... just letters and numbers on paper. It was on a system like that when I first fell in love
          with the game "The Oregon Trail".
        </p>
        <p>So for years and years now, I've wanted to relive that first early computing experience and have never found a
          way to. But lucky for me, some people have managed to preserve and share <a href="http://web.archive.org/web/20180706191111/https://www.filfre.net/tag/the-oregon-trail/">the
            original BASIC source code</a> to the game. Now most of us don't have access to a system that would run this
          code. And I'm not sure if there's even an emulator for these old machines that is easy to find and use. But
          with the source code, I figured I'd be able to recreate the
          game in all its original glory in some newer programming language. So I did.
        </p>
        <p>
          What I've done here is translate the original code into Javascript, so it can run directly in a web browser --
          that way pretty much any device around these days would be able to play the game. If you look at <a href="https://github.com/mlibby/mlibby.github.io/blob/master/js/app/oregon.js">my
            source code</a> for the game, you'll see that I've done a very literal translation for the most part. It
          looks horrible, but doing it the way I did allowed me to audit my code right alongside the original to make
          sure I was getting everything exactly the same.
          My goal here was to recreate the game, faithfully, not to write brilliant code, after all.
        </p>
        <button class="play-oregon btn btn-primary mb-3">Play The Oregon Trail</button>
      </section>
    </div>
  </div>
`;

export default class WhyOregonView extends Backbone.View {
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
