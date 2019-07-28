"use strict";

import Router from "./router.js";

$().ready(function () {
  $(window.document).on("click", "a[href]:not([data-bypass])", function (e) {
    $(".navbar-collapse").removeClass("show");
  });

  const router = new Router();
  Backbone.history.start({ pushState: false });
});