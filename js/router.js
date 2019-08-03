"use strict";

import HomeView from "/js/app/views/home.js";
import OregonView from "./app/views/oregon.js";
import WhyOregonView from "./app/views/whyOregon.js";
import AboutView from "./app/views/about.js";
import AiView from "./app/views/ai.js";
import AiPuzzleView from "./app/views/ai/puzzle.js";
import AiSearchView from "./app/views/ai/search.js";
import OtherView from "./app/views/other.js";
import OtherBefungeView from "./app/views/other/befunge.js";
import OtherRgbClockView from "./app/views/other/rgbClock.js";

export default class Router extends Backbone.Router {
  preinitialize() {
    this.routes = {
      "": "home",
      "about": "about",
      "oregon": "oregon",
      "oregon-why-and-how": "oregonWhy",
      "ai": "ai",
      "ai-puzzle": "aiPuzzle",
      "ai-search": "aiSearch",
      "other": "other",
      "other-befunge": "otherBefunge",
      "other-clock": "otherClock"
    };
    this.view = new Backbone.View();
  }

  switchView(view, navItem, pageTitle) {
    this.view.remove();
    $("#app").html(view.render().el);
    $(".nav-link").removeClass("active");
    $(navItem).addClass("active");
    document.title = pageTitle + " - mlibby.com"
  }

  home() {
    this.switchView(new HomeView(), "", "Home");
  }

  about() {
    this.switchView(new AboutView(), "#nav-about", "About Me");
  }

  oregon() {
    this.switchView(new OregonView(), "#nav-oregon", "Oregon Trail");
  }

  oregonWhy() {
    this.switchView(new WhyOregonView(), "#nav-oregon", "Oregon Trail");
  }

  ai() {
    this.switchView(new AiView(), "#nav-ai", "Artificial Intelligence");
  }

  aiPuzzle() {
    this.switchView(new AiPuzzleView(), "#nav-ai", "AI Puzzle");
  }

  aiSearch() {
    this.switchView(new AiSearchView(), "#nav-ai", "AI Search");
  }

  other() {
    this.switchView(new OtherView(), "#other", "Other Projects");
  }

  otherBefunge() {
    this.switchView(new OtherBefungeView(), "#other", "Befunge IDE");
  }

  otherClock() {
    this.switchView(new OtherRgbClockView(), "#other", "RGB Clock");
  }
}

