"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import TuringMachine from "../../turing.js";

const template = (d) => html`
<article class="turing">
  <div class="row">
    <section class="col-12">
      <div class="h-horizontal">
        <h2 class="panel-title">
          About This
        </h2>
        <button class="btn btn-default" type="button" data-toggle="collapse" data-target=".about-collapse"
          aria-expanded="true" aria-controls="aboutPanel">
          <span class="collapse-button collapse show"></span>
        </button>
      </div>
      <div id="aboutPanel" class="about-collapse collapse show">
        <p>
          In 1936, <a href="https://en.wikipedia.org/wiki/Alan_Turing">Alan Turing</a> described a machine
          that has since become known as the "<a href="https://en.wikipedia.org/wiki/Turing_machine">Turing
            Machine</a>" in his paper "<a href="https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230">On
            Computable Numbers, with an Application to the Entscheidungsproblem</a>". In looking at the
          existing Turing Machine emulators available online, I found many that were very helpful as aids to
          understanding the general concepts... but none that really had the look and feel of the machine
          described in Turing's paper. This is an attempt to remedy that &mdash; to create a <i>classic</i>
          Turing Machine emulator, one that allows you to run the actual m-configurations from Turing's
          paper.
        </p>
        <p>
          Turing's example m-configurations in his paper used a variety of symbols that aren't exactly
          standard on today's computers, but they are supported by this emulator. But because I found Charles
          Petzold's book "The Annotated Turing"...
        </p>
      </div>
    </section>
  </div>
  <div class="row">
    <section class="col-12">
      <h2 class="h-horizontal">Tape</h2>
      <div class="turing-tape">
      </div>
    </section>
  </div>
  <div class="row">
    <div class="col-md-6 order-md-2">
      <div class="row">
        <section class="col-12">
          <h2 class="h-horizontal">File</h2>
          <div class="form-inline">
            <div class="input-group">
              <div class="input-group-prepend" title="Load File">
                <button class="input-group-text">
                  <span class="icon-upload"></span>
                  <span class="sr-only">Open File</span>
                </button>
              </div>
              <input id="file-name" type="text" class="form-control" />
            </div>
            <button id="save-file" class="btn btn-default" title="Save File" disabled="disabled">
              <span class="icon-hdd-o"></span>
              <span class="sr-only">Save File</span>
            </button>
            <select id="turing-demo-config" class="form-control">
              <option selected="selected" value="0">Choose a demo configuration...</option>
            </select>
          </div>
        </section>
        <section class="col-6 col-sm-6">
          <h2>Controls</h2>
          <button id="turing-reset" class="btn btn-primary" title="Reset Machine">
            <span class="icon-refresh"></span>
            <span class="sr-only">Reset Machine</span>
          </button>
          <button id="turing-run" class="btn btn-primary" title="Begin">
            <span class="icon-play"></span>
            <span class="sr-only">Begin Machine</span>
          </button>
          <button id="turing-pause" class="btn btn-primary hidden" title="Pause">
            <span class="icon-pause"></span>
            <span class="sr-only">Pause Machine</span>
          </button>
        </section>
        <section class="col-6 col-sm-6">
          <h2>Speed</h2>
          <button id="turing-slower" class="btn btn-info" title="Slower">
            <span class="icon-chevron-down"></span>
            <span class="sr-only">Slower</span>
          </button>
          <button id="turing-faster" class="btn btn-info" title="Faster">
            <span class="icon-chevron-up"></span>
            <span class="sr-only">Faster</span>
          </button>
        </section>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 order-md-1">
      <section>
        <h2 class="h-horizontal">Configuration</h2>
        <textarea id="turing-config-raw" class="form-control raw-code" rows="16"></textarea>
      </section>
    </div>
  </div>
</article>
`;

export default class OtherTuringView extends Backbone.View {
  constructor() {
    super();
    this.$fileName = null;
    this.$stockSelect = null;
    this.$tape = null;
    this.tm = null;

    this.demoConfigs = {
      "Turing01-ZeroOne": [
        "b  None  P0,R  c",
        "c  None  R     e",
        "e  None  P1,R  k",
        "k  None  R     b"
      ],
      "Turing02-ZeroOneConcise": [
        "b { None  P0      b",
        "  { 0     R,R,P1  b",
        "  { 1     R,R,P0  b"
      ],
      "Turing03-MoreOnes": [
        "b  None  P@,R,P@,R,P0,R,R,P0,L,L  o", "",
        "o { 1  R,Px,L,L,L  o",
        "  { 0  R,Px,L,L,L  q", "",
        "q { Any   R,R   q",
        "  { None  P1,L  p", "",
        "p { x      E,R  q",
        "  { @      R    k",
        "  { None   L,L  p", "",
        "k { Any    R,R     k",
        "  { None   P0,L,L  o"
      ]
    };
  }

  demoConfigSelected(e) {
    let config = this.$selectDemo.val();
    this.$fileName.val(config);

    this.$("#turing-config-raw").text(this.demoConfigs[config].join("\n"));
  }

  initDemoConfigMenu() {
    this.$selectDemo = this.$("#turing-demo-config");

    for (let config in this.demoConfigs) {
      this.$selectDemo.append($("<option value='" + config + "'>" + config + "</option>"));
    }

    this.$selectDemo.change(() => { this.demoConfigSelected(); });
  }

  render() {
    render(template(), this.el);

    //this.$("#aboutPanel").collapse();

    this.$fileName = this.$("#file-name");
    this.$fileName.val("");

    this.initDemoConfigMenu();

    this.tm = new TuringMachine(this.$(".turing-tape"));
    this.tm.displayTape();

    return this;
  }
}