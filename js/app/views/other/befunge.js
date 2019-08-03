"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
`;


export default class OtherBefunge extends Backbone.View {
  render() {
    render(template(), this.el);
    return this;
  }
}