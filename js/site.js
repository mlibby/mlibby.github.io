function playOregon () {
  import('./oregon.js').then(oregon => {
    oregon.play();
  });
}

$().ready(function () {
  $('button.play-oregon').click(playOregon);
});