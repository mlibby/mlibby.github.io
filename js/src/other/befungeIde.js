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
    this.$run = $display.find(".run");
    this.$stop = $display.find(".stop");
    this.$activeCell = $display.find(".noCell");

    this.drawTorus();
    this.initStockBefungeMenu();

    // $("#open-file").click( () => {
    //   $("#befunge-file")[0].click();
    // });

    // $("#befunge-file").change(function () {
    //   bf.readFile();
    // });

    this.$run.click(() => { this.befunge.run(); });

    this.$stop.click(() => { this.befunge.stop(); })


    // $("#befunge-reset").click(function () {
    //   bf.reset();
    // });

    // $("#befunge-clear").click(function () {
    //   bf.clearConsole();
    // });

    // $("#befunge-slower").click(function () {
    //   bf.slower();
    // });

    // $("#befunge-faster").click(function () {
    //   bf.faster();
    // });
  }

  get callbacks() {
    return {
      pcChanged: (x, y) => {this.pcChanged(x, y); },
      cellChanged: (x, y, val) => { this.cellChanged(x, y, val); },
      printed: (val) => { this.printed(val); }
    }
  }

  drawTorus() {
    this.$torus.children().remove();
    for (var y = 0; y < Befunge.height; y++) {
      const $row = $("<div class='torus-row'></div>");
      for (var x = 0; x < Befunge.width; x++) {
        const $input = $("<input class='" + this.getCellId(x, y).replace(".", "") + "' type='text' maxlength='1' value=' ' />");
        $row.append($input);
      }

      this.$torus.append($row);
    }
  }

  initStockBefungeMenu() {
    for (var program in stockBefunges) {
      this.$stockFiles.append($("<option value='" + program + "'>" + program + "</option>"));
    }

    this.$stockFiles.change(() => {
      this.fileName = this.$stockFiles.val();
      this.befunge = new Befunge(stockBefunges[this.fileName], this.callbacks);
    });
  }

  cellChanged(x, y, val) {
    const cell = this.$torus.find(this.getCellId(x, y));
    cell.val(String.fromCharCode(val));
  }

  pcChanged(x, y) {
    this.$activeCell.removeClass("active-cell");
    this.$activeCell = this.$torus.find(this.getCellId(x, y));
    this.$activeCell.addClass("active-cell");
  }

  printed(val) {
    this.$console.val(this.$console.val() + val);
    this.$console.scrollTop(this.$console[0].scrollHeight - this.$console.height());
  }

  clearConsole() {
    this.$console.val("");
  }

  readFile() {
    const file = $("#befunge-file")[0].files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => { this.loadBefunge(e); };
      fileReader.readAsText(file);
      $("#file-name").val(file.name);
    }
    else {
      alert("Failed to load file");
    }
  }

  showStack() {
    const stackMode = this.$stackMode.val();
    var stackText = "";
    for (var sdx = 0; sdx < this.stack.length; sdx++) {
      var charCode = this.stack[sdx];
      var addChar;
      if (stackMode === "asc") {
        if (32 <= charCode && charCode <= 126) {
          addChar = String.fromCharCode(charCode);
        }
        else {
          addChar = ("00" + charCode.toString(10)).substr(-3, 3);
        }
      }
      else if (stackMode === "dec") {
        addChar = charCode;
      }
      else { ///stackmode === "hex"
        addChar = ("0" + charCode.toString(16)).substr(-2, 2);
      }

      stackText = stackText + addChar + " ";
    }

    this.$stack.val(stackText);
  }

  activateCurrentCell() {
    $(".torus-row").children().removeClass("active-cell");
    this.getCurrentCell().addClass("active-cell");
  }


  getCellId(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return "oob";
    }
    else {
      return ".cell-" + x + "-" + y;
    }
  }

}
