"use strict";

import Befunge from "../../befunge.js";
import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
<div id="befunge">
  <div class="row">
    <section class="col-12 mb-3">
      <div class="form-inline">
        <select id="befunge-stock-files" class="form-control">
          <option selected value="0">Choose a stock program...</option>
        </select>
  <div class="input-group">
          <button class="btn btn-secondary" title="Load File">
            <span class="icon-upload"></span>
            <span class="sr-only">Open File</span>
            <input id="befunge-file" type="file" style="display: none;" />
          </button>
          <!-- input id="file-name" type="text" class="form-control" / -->
        </div>

        <button id="save-file" class="btn btn-secondary" title="Save File">
          <span class="icon-hdd-o"></span>
          <span class="sr-only">Save File</span>
        </button>

        <button id="befunge-reset" class="btn btn-primary" title="Reset Befunge">
          <span class="icon-refresh"></span>
          <span class="sr-only">Reset Befunge</span>
        </button>
        <button id="befunge-run" class="btn btn-primary" title="Run">
          <span class="icon-play"></span>
          <span class="sr-only">Run</span>
        </button>
        <button id="befunge-pause" class="btn btn-primary hidden" title="Pause">
          <span class="icon-pause"></span>
          <span class="sr-only">Pause</span>
        </button>
        <button id="befunge-slower" class="btn btn-info" title="Slower">
          <span class="icon-chevron-down"></span>
          <span class="sr-only">Slower</span>
        </button>
        <button id="befunge-faster" class="btn btn-info" title="Faster">
          <span class="icon-chevron-up"></span>
          <span class="sr-only">Faster</span>
        </button>
      </div>
    </section>
  </div>
  <div class="row mb-3">
    <section class="col-md-6">
      <div class="form-inline">
        <h2 class="h-horizontal">Console</h2>
        <button id="befunge-clear" class="btn btn-danger by-header" title="Clear Console">
          <span class="icon-remove" aria-hidden="true"></span><span class="sr-only">Clear Console</span>
        </button>
      </div>
      <textarea id="befunge-console" class="form-control" readonly></textarea>
    </section>
    <section class="col-md-6">
      <div>
        <h2 class="h-horizontal">Stack</h2>
        <select id="befunge-stack-mode" class="form-control by-header">
          <option value="asc" selected>ascii</option>
          <option value="dec">decimal</option>
          <option value="hex">hexadecimal</option>
        </select>
      </div>
      <textarea id="befunge-stack" class="form-control" readonly></textarea>
    </section>
  </div>
  <div class="row">
    <section class="col-12">
      <h2>The Torus</h2>
      <div id="torus-wrapper">
        <div id="torus"></div>
      </div>
    </section>
  </div>
</div>
`;

export default class OtherBefunge extends Backbone.View {
  render() {
    render(template(), this.el);

    var bf = new Befunge(this);
    this.$("#befunge-file").change(function () {
      bf.readFile();
    });
    bf.drawTorus();

    this.$("#befunge-run").click(function () {
      bf.startRun();
    });

    this.$("#befunge-pause").click(function () {
      bf.pauseRun();
    });

    this.$("#befunge-reset").click(function () {
      bf.reset();
    });

    this.$("#befunge-clear").click(function () {
      bf.clear();
    });

    this.$("#befunge-slower").click(function () {
      bf.slower();
    });

    this.$("#befunge-faster").click(function () {
      bf.faster();
    });

    bf.initStockBefungeMenu();

    return this;
  }
}