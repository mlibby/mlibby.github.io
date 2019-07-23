import OregonTrail from "./oregon.js"

$().ready(function () {
  const $main = $('main .row .col');
  $('button.play-oregon').click(() => {
    const oregonTrail = new OregonTrail($main);
    oregonTrail._160_play();
  });
});
