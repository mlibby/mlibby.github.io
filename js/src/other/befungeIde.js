import Befunge from "/js/src/other/befunge.js"

const stockBefunges = {
  "hello_world.bf":

    `64+"!dlroW ,olleH">:#,_@`,

  "99_bottles.bf": `

"d"4vv"take one down, pass it around"<>
:-2*< v "e wall"_v#\\0\`1%4./4::_0#%>#4^#
\\4>/|>:#,_$:55+:,\\4%3-!*0\\>:>#,_$$:1+\\1
>>>#@^>$"ht no "\\>\\"reeb fo selttob">>>

`,
  "pascals_triangle.bf": `

0" :swor fo rebmuN">:#,_&> 55+, v
v01*p00-1:g00.:<1p011p00:\\-1_v#:<
>g:1+10p/48*,:#^_$ 55+,1+\\: ^>$$@

`,
  "fizzbuzz.bf": `

  55*4*v    _   v
v   <>:1-:^
    |:<$      <    ,*48 <
    @>0"zzif">:#,_$      v
>:3%!|    >0"zzub">:#,_$^
     >:5%!|
v "buzz"0<>:.           ^
         |!%5:           <
>:#,_   $>              ^

`,
}

export default class BefungeIde {

  constructor($display) {
    this.$stockFiles = $display.find(".stock-files")
    this.$open = $display.find(".open-file")
    this.$file = $display.find(".file")
    this.$save = $display.find(".save-file")

    this.$reset = $display.find(".reset")
    this.$run = $display.find(".run")
    this.$step = $display.find(".step")
    this.$stop = $display.find(".stop")
    this.$debug = $display.find(".debug")
    this.$slower = $display.find(".slower")
    this.$faster = $display.find(".faster")

    this.$clear = $display.find(".clear-console")
    this.$console = $display.find(".console")
    this.$torus = $display.find(".torus")
    this.$stackMode = $display.find(".stack-mode")
    this.$stack = $display.find(".stack")
    this.$activeCell = $display.find(".noCell")

    this.drawTorus()
    this.initStockBefungeMenu()

    this.$open.click(() => this.$file[0].click())
    this.$file.change(() => this.readFile())

    this.$run.click(() => this.befunge.run())
    this.$step.click(() => this.befunge.oneStep())
    this.$stop.click(() => this.befunge.stop())
    this.$reset.click(() => this.befunge.reset())

    this.$debug.click(() => this.toggleDebug())
    this.$slower.click(() => this.befunge.slower())
    this.$faster.click(() => this.befunge.faster())

    this.$clear.click(() => this.$console.val(""))
  }

  get callbacks() {
    return {
      pcChanged: (x, y) => this.pcChanged(x, y),
      cellChanged: (x, y, val) => this.cellChanged(x, y, val),
      stackChanged: () => this.stackChanged(),
      printed: (val) => this.printed(val),
      torusCleared: () => this.drawTorus(),
    }
  }

  toggleDebug() {
    this.befunge.toggleDebug()
    if (this.befunge.debugging) {
      this.$activeCell.removeClass("active-cell")
      this.$debug.removeClass("btn-outline-info")
      this.$debug.addClass("btn-info")
      this.$debug.attr("aria-pressed", "true")
      this.stackChanged()
    }
    else {
      this.$debug.removeClass("btn-info")
      this.$debug.addClass("btn-outline-info")
      this.$debug.attr("aria-pressed", "false")
      this.$stack.val("")
    }
  }

  drawTorus() {
    this.$torus.children().remove()
    for (var y = 0; y < Befunge.height; y++) {
      const $row = $("<div class='torus-row'></div>")
      for (var x = 0; x < Befunge.width; x++) {
        const $input = $("<input class='" + this.getCellId(x, y).replace(".", "") + "' type='text' maxlength='1' value=' ' />")
        $row.append($input)
      }

      this.$torus.append($row)
    }
  }

  initStockBefungeMenu() {
    for (var program in stockBefunges) {
      this.$stockFiles.append($(`<option value='${program}'>${program}</option>`))
    }

    this.$stockFiles.change(() => {
      this.fileName = this.$stockFiles.val()
      this.loadBefunge(stockBefunges[this.fileName].trim())
    })
  }

  loadBefunge(program) {
    this.befunge = new Befunge(program, this.callbacks);
  }

  cellChanged(x, y, val) {
    const cell = this.$torus.find(this.getCellId(x, y))
    if (32 <= val && val < 127) {
      cell.val(String.fromCharCode(val))
    }
    else {
      cell.val("𝒶")
      cell.attr("title", val)
    }
  }

  pcChanged(x, y) {
    if (this.befunge.debugging) {
      this.$activeCell.removeClass("active-cell")
      this.$activeCell = this.$torus.find(this.getCellId(x, y))
      this.$activeCell.addClass("active-cell")
    }
  }

  stackChanged() {
    if (this.befunge.debugging) {
      let stack
      const mode = this.$stackMode.val()
      if (mode === "dec") {
        stack = this.befunge.stack.map(s => s.toString())
      }
      else if (mode === "asc") {
        stack = this.befunge.stack.map(s => {
          if (32 < s && s < 127) {
            return String.fromCharCode(s)
          }
          else {
            return `#${s}`
          }
        })
      }
      else { // hex mode
        stack = this.befunge.stack.map(s => "$" + s.toString(16))
      }

      this.$stack.val(stack.join(" "))
    }
  }

  printed(val) {
    this.$console.val(this.$console.val() + val)
    this.$console.scrollTop(this.$console[0].scrollHeight - this.$console.height())
  }

  clearConsole() {
    this.$console.val("")
  }

  readFile() {
    const file = this.$file[0].files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        this.loadBefunge(e.target.result)
      }
      fileReader.readAsText(file)
      this.$file.val(file.name)
    }
    else {
      alert("Failed to load file")
    }
  }

  activateCurrentCell() {
    $(".torus-row").children().removeClass("active-cell")
    this.getCurrentCell().addClass("active-cell")
  }

  getCellId(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return "oob"
    }
    else {
      return ".cell-" + x + "-" + y
    }
  }
}
