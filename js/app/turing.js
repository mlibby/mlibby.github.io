export default
  class TuringMachine {
  constructor($tapeDisplay) {
    this.tapeDisplay = $tapeDisplay;
    this.tape = new Array(64);
    this.currentCell = 0;
    this.maxCell = 0;
  }

  displayTape() {
    for (let x = 0; x < this.tape.length; x++) {
      let cellID = "turing-cell-" + x;
      let $cell = this.tapeDisplay.find("#" + cellID);
      if ($cell.length === 0) {
        $cell = $("<div class='turing-tape-cell' id='" + cellID + "'></div>");
        this.tapeDisplay.append($cell);
      }

      let cellValue = this.tape[x];
      if (cellValue == "") {
        $cell.html("&nbsp;");
      }
      else {
        $cell.text(cellValue);
      }

      if (this.currentCell === x) {
        $cell.addClass('active-cell');
      }
      else {
        $cell.removeClass('active-cell');
      }

      if (this.currentCell > this.maxCell) {
        maxCell = this.currentCell;
      }

      if (this.maxCell + 16 > this.tape.length) {
        this.tape = this.tape.concat(new Array(16));
      }
    }
  }
}

