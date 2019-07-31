"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
<article class="row">
  <div class="col-sm-12">
    <h2>Trinary Clock</h2>
    <p>This is a clock that tells time using the colors Red, Blue, and Green</p>
  </div>
</article>
`;

export default class OtherRgbClockView extends Backbone.View {
  render() {
    render(template(), this.el);
    return this;
  }
}