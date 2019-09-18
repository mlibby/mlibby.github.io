import Befunge from "/js/src/other/befunge.js";

"use strict";

export default
  class BefungeIde {

  constructor($display) {
    this.$console = $display.find(".console");
    this.$torus = $display.find(".torus");
    this.$stackMode = $display.find(".stack-mode");
    this.$stack = $display.find(".stack");

    this.bf = new Befunge();
  }

  drawTorus() {
    this.$torus.children().remove();
    for (var y = 0; y < this.bf.height; y++) {
      const $row = $("<div class='torus-row'></div>");
      for (var x = 0; x < this.bf.width; x++) {
        const $input = $("<input id='" + this.getTorusId(x, y) + "' type='text' maxlength='1' />");
        $input.val(this.bf.torus[y][x]);
        $row.append($input);
      }

      this.$torus.append($row);
    }
  }
}
