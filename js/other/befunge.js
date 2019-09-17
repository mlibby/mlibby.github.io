import Befunge from "/js/src/other/befunge.js";

"use strict";

$(document).ready(() => {
  var bf = new Befunge($("main.befunge"));

  bf.drawTorus();
  bf.initStockBefungeMenu();

  $("#open-file").click( () => {
    $("#befunge-file")[0].click();
  });

  $("#befunge-file").change(function () {
    bf.readFile();
  });

  $("#befunge-run").click(function () {
    bf.run();
  });

  $("#befunge-stop").click(function () {
    bf.stop();
  });

  $("#befunge-reset").click(function () {
    bf.reset();
  });

  $("#befunge-clear").click(function () {
    bf.clearConsole();
  });

  $("#befunge-slower").click(function () {
    bf.slower();
  });

  $("#befunge-faster").click(function () {
    bf.faster();
  });
});