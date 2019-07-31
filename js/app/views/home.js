"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
<article class="row">
  <div class="col-sm-12">
    <h2>Hello!</h2>
    <p>
      I am Michael C. Libby and this is my site. I am a software developer, web developer, and constantly learning more
      about computers and programming them. My friends tend to call me &ldquo;Libby.&rdquo; You are welcome to do the same.
    </p>
  </div>
</article>
`;

export default class HomeView extends Backbone.View {
  render() {
    render(template(), this.el);
    return this;
  }
}
