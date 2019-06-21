import OregonTrail from "./oregon.js"

$().ready(function () {
  $('button.play-oregon').click(() => { (new OregonTrail()).play() });
});
