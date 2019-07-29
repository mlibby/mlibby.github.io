"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
  <div class="row">
    <div class="col">
      <section class="ai">
          <p>
            These are practice programs I've written as I work through the textbook <a href="http://aima.cs.berkeley.edu/index.html"><cite>Artificial
              Intelligence: A Modern Approach</cite></a>.
            </p>
        <h3>Chapter 3: Problem Solving</h3>
        <dl class="parenthetical">
          <dt>
            <a href="#ai-search">Search</a>
          </dt>
          <dd>
            <a title="Sweet Dreams by the Eurythmics" href="https://www.youtube.com/watch?v=qeMFqkcPYcg">"Everybody's
              looking for something"</a>
          </dd>
          <dt>
            <a href="#ai-puzzle">Puzzle</a>
          </dt>
          <dd>
            The classic sliding tiles puzzle.
          </dd>
        </dl>
      </section>
    </div>
  </div>
`;

export default class AiView extends Backbone.View {
  render() {
    render(template(), this.el);
    return this;
  }
}