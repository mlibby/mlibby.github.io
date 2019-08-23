import Befunge from "/js/src/other/befunge.js";

"use strict";

$(document).ready(() => {
  var bf = new Befunge($("main.befunge"));

  bf.drawTorus();
  bf.initStockBefungeMenu();

  $("#befunge-file").change(function () {
    bf.readFile();
  });

  $("#befunge-run").click(function () {
    bf.startRun();
  });

  $("#befunge-pause").click(function () {
    bf.pauseRun();
  });

  $("#befunge-reset").click(function () {
    bf.reset();
  });

  $("#befunge-clear").click(function () {
    bf.clear();
  });

  $("#befunge-slower").click(function () {
    bf.slower();
  });

  $("#befunge-faster").click(function () {
    bf.faster();
  });
});