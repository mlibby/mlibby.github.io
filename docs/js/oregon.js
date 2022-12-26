import OregonTrail from "/js/src/oregon.js";

"use strict";

$(document).ready(() => {
  $(".play-oregon").click(() => {
    const $app = $('#app');
    const oregonTrail = new OregonTrail($app);
    oregonTrail._160_play();
  });
});