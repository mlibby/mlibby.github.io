"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";

const template = (d) => html`
<article class="rgb-clock">
  <div class="row">
    <section class="col-sm-12">
      <h2>The RGB Clock</h2>
      <p>
        This is a Javascript prototype of an <a href="https://github.com/mlibby/arduino/tree/master/RgbClock">RGB Clock</a>
        project I am working on with Arduino, RGB LEDs, and a couple of shift registers.
      </p>
      <p>
        "Normal" clocks display time in base 10 (that is, digits 1234567890). Nerds often make clocks in binary (base 2
        -- just 0s and 1s, or lights that are on or off). This clock uses Red, Green, and Blue instead of numerals
        (denoting the values of zero, one, and two)
      </p>
      <p>
        This clock includes the place numbers for the base 3 numbers to help decode/understand the numbers of the
        clock.
        It also includes a "normal" 24 hour clock to aid in double-checking the LED display. The real clock will simply
        be 11 LED bulbs.
      </p>
    </section>
  </div>
  <div class="row">
    <section class="col-sm-6">
      <h2>Simulated LEDs</h2>
      <table class="clock">
        <tr>
          <th>Hours</th>
          <td class='r1c1 red'>9s</td>
          <td class='r1c2 red'>3s</td>
          <td class='r1c3 red'>1s</td>
          <td class='r1c4 void'></td>
        </tr>
        <tr>
          <th>Minutes</th>
          <td class='r2c1 red'>27s</td>
          <td class='r2c2 red'>9s</td>
          <td class='r2c3 red'>3s</td>
          <td class='r2c4 red'>1s</td>
        </tr>
        <tr>
          <th>Seconds</th>
          <td class='r3c1 red'>27s</td>
          <td class='r3c2 red'>9s</td>
          <td class='r3c3 red'>3s</td>
          <td class='r3c4 red'>1s</td>
        </tr>
      </table>
    </section>
  </div>
  <div class="row">
    <section class="col-sm-12">
      <h2>24 Hour Clock</h2>
      <pre id='current-time'>23:59:59</pre>
    </section>
  </div>
</article>
`;

export default class OtherRgbClockView extends Backbone.View {
  setLed(cell, value) {
    var $cell = $(cell);
    $cell.removeClass('red green blue');
    if (value > 1) {
      $cell.addClass('blue');
    } else if (value > 0) {
      $cell.addClass('green');
    } else {
      $cell.addClass('red');
    }
  }

  updateHours(hours) {
    var nines = Math.floor(hours / 9);
    var threes = Math.floor((hours % 9) / 3);
    var ones = (hours % 9) % 3;

    this.setLed('.r1c1', nines);
    this.setLed('.r1c2', threes);
    this.setLed('.r1c3', ones);
  }

  updateMinutes(minutes) {
    var twoSevens = Math.floor(minutes / 27);
    var nines = Math.floor((minutes % 27) / 9);
    var threes = Math.floor(((minutes % 27) % 9) / 3);
    var ones = ((minutes % 27) % 9) % 3;

    this.setLed('.r2c1', twoSevens);
    this.setLed('.r2c2', nines);
    this.setLed('.r2c3', threes);
    this.setLed('.r2c4', ones);
  }

  updateSeconds(seconds) {
    var twoSevens = Math.floor(seconds / 27);
    var nines = Math.floor((seconds % 27) / 9);
    var threes = Math.floor(((seconds % 27) % 9) / 3);
    var ones = ((seconds % 27) % 9) % 3;

    this.setLed('.r3c1', twoSevens);
    this.setLed('.r3c2', nines);
    this.setLed('.r3c3', threes);
    this.setLed('.r3c4', ones);
  }

  updateLeds(clockTime) {
    var hours = Number(clockTime.substr(0, 2));
    this.updateHours(hours);

    var minutes = Number(clockTime.substr(3, 2));
    this.updateMinutes(minutes);

    var seconds = Number(clockTime.substr(6, 2));
    this.updateSeconds(seconds);
  }

  updateClock(clockTime) {
    $('#current-time').text(clockTime);
  }

  updatePage() {
    var longTime = (new Date()).toTimeString();
    var clockTime = longTime.substr(0, 8);
    this.updateClock(clockTime);
    this.updateLeds(clockTime);
  }

  render() {
    render(template(), this.el);
    setInterval(() => { this.updatePage(); }, 500);
    return this;
  }
}