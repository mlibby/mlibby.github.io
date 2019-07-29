"use strict";

import HomeView from "/js/app/views/home.js";
import OregonView from "./app/views/oregon.js";
import WhyOregonView from "./app/views/whyOregon.js";
import AboutView from "./app/views/about.js";

export default class Router extends Backbone.Router {
  preinitialize() {
    this.routes = {
      "": "home",
      "about": "about",
      "oregon": "oregon",
      "why-and-how-oregon": "whyOregon"
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

  about () {
    this.switchView(new AboutView(), "");
  }

  oregon() {
    this.switchView(new OregonView(), "#nav-oregon");
  }

  whyOregon() {
    this.switchView(new WhyOregonView(), "#nav-oregon");
  }
}

