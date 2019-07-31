"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
<article class="row">
  <div class="col-sm-12">
    <h2>Other Projects I've Done</h2>
    <p>
      I like to dabble in electronics once in a while, so here's some outtakes from that process.
    </p>
    <ul>
      <li><a href="#other-clock">RGB Clock</a> - a clock that tells time using the colors Red, Blue, and Green</li>
    </ul>
  </div>
</article>
`;

export default class OtherView extends Backbone.View {
  render() {
    render(template(), this.el);
    return this;
  }
}
