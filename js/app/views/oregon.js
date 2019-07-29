"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import OregonTrail from "../oregon.js";

const template = (d) => html`
  <div class="row">
    <div class="col">
      <section id="oregon-trail">
        <h2>Play the <em>Original</em> Oregon Trail Game</h2>
        <blockquote class="alert alert-primary d-inline-block mt-1" >
          "You have died of dysentery."
        </blockquote>
        <p>This particular quote from the game Oregon Trail is an internet meme
          at this point... but did you know it wasn't in the original game? The first version of Oregon Trail
          was a text-only adventure written for a timeshare computer that students would interact with at a teletype
          terminal. It was this version that I first encountered. I have been wanting to see it again for some time now.
        </p>
        <p>
          This is my attempt to recreate that original version of "The Oregon Trail".
          There are no graphics. Whenever the computer has printed out its part, you will get an
          input box for your response. Just type into it and press Enter/Return. If the program is
          expecting a number, you will only be able to type numbers into the box.
        </p>
        <p>
          Please enjoy! If you are interested, here is <a href="#oregon-why-and-how">an essay with more background on
            why and how </a> I put this together.
        </p>
        <button class="play-oregon btn btn-primary mb-3">Play The Oregon Trail</button>
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
