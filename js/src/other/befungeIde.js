import Befunge from "/js/src/other/befunge.js";

"use strict";

const stockBefunges = {
  "hello_world.bf":
    "64+\"!dlroW ,olleH\">:#,_@",
  "99_bottles.bf":
    '"d"4vv"take one down, pass it around"<>' + "\n" +
    ':-2*< v "e wall"_v#\\0`1%4./4::_0#%>#4^#' + "\n" +
    '\\4>/|>:#,_$:55+:,\\4%3-!*0\\>:>#,_$$:1+\\1' + "\n" +
    '>>>#@^>$"ht no "\\>\\"reeb fo selttob">>>' + "\n",
  "pascals_triangle.bf":
    '0" :swor fo rebmuN">:#,_&> 55+, v' + "\n" +
    'v01*p00-1:g00.:<1p011p00:\\-1_v#:<' + "\n" +
    '>g:1+10p/48*,:#^_$ 55+,1+\\: ^>$$@' + "\n",
  "fizzbuzz.bf":
    '55*4*v    _   v' + "\n" +
    'v   <>:1-:^' + "\n" +
    '    |:<$      <    ,*48 <' + "\n" +
    '    @>0"zzif">:#,_$      v' + "\n" +
    '>:3%!|    >0"zzub">:#,_$^' + "\n" +
    '     >:5%!|' + "\n" +
    'v "buzz"0<>:.           ^' + "\n" +
    '         |!%5:           <' + "\n" +
    '>:#,_   $>              ^',
};

export default
  class BefungeIde {

  constructor($display) {
    this.$stockFiles = $display.find(".stock-files");
    this.$console = $display.find(".console");
    this.$torus = $display.find(".torus");
    this.$stackMode = $display.find(".stack-mode");
    this.$stack = $display.find(".stack");

    this.bf = new Befunge();
  }

  initStockBefungeMenu() {
    var $select = $("#befunge-stock-files");
    for (var program in stockBefunges) {
      $select.append($("<option value='" + program + "'>" + program + "</option>"));
    }

    $select.change(() => {
      var fileName = $select.val();
      var dummyResponse = {
        target: {
          result: stockBefunges[fileName]
        }
      };
      this.loadBefunge(dummyResponse);
      $("#file-name").val(fileName);
    });
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
