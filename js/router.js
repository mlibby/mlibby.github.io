"use strict";

import HomeView from "/js/app/views/home.js";
import OregonView from "./app/views/oregon.js";

export default class Router extends Backbone.Router {
  preinitialize() {
    this.routes = {
      "": "home",
      "oregon": "oregon"
    };
    this.view = new Backbone.View();
  }

  switchView(view, navItem) {
    this.view.remove();
    $("#app").html(view.render().el);
    $(".nav-item").removeClass("active");
    $(navItem).addClass("active");
  }

  home() {
    this.switchView(new HomeView(), "");
  }

  oregon() {
    this.switchView(new OregonView(), "#nav-oregon");
  }
}

