"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import Romania from "../../ai/romania.js";
import DepthFirstSearch from "../../ai/graph-search-dfs.js";
import UniformCostSearch from "../../ai/uniform-cost-search.js";
import TreeSearch from "../../ai/tree-search.js";
import BreadthFirstSearch from "../../ai/graph-search-bfs.js";

const template = (d) => html`
<section class="ai">
  <div class="row">
    <div class="col-12">
      <h2>AI: Route Search</h2>
      <p>Here I'm just using different search strategies to find a route from one city in Romania to another.</p>
      <p>I am using <tt>performance.now()</tt> to measure the elapsed time it took to compute the route, but it
        appears that <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now">this method is
          currently not returning high-res results</a> due to the Spectre vulnerability, so if it takes less than
        1 millisecond to complete, we're not really going to see how long it takes. <em>sigh</em>
      </p>
    </div>
    <div class="col-md-6">
      <h3>Choose endpoints and search algorithm</h3>
      <form class="form">
        <div class="form-group">
          <label for="from-city" class="control-label">From</label>
          <select id="from-city" class="form-control"></select>
        </div>
        <div class="form-group">
          <label for="to-city" class="control-label">To</label>
          <select id="to-city" class="form-control"></select>
        </div>
        <div class="form-group">
          <label for="search-algorithm" class="control-label">Algorithm</label>
          <select id="search-algorithm" class="form-control">
            <option value="tree-search">Tree-Search</option>
            <option value="graph-search-bfs">Graph-Search (breadth first)</option>
            <option value="graph-search-dfs">Graph-Search (depth first)</option>
            <option value="uniform-cost-search">Uniform-Cost-Search</option>
          </select>
        </div>
        <div class="form-group">
          <button id="search" class="btn btn-primary">Find Route</button>
        </div>
      </form>

      <div id="results" style="display:none;">
        <h3>Results</h3>
        <dl class="search-results">
          <dt>
            Nodes used in search
          </dt>
          <dd id="nodes-used">
            0
          </dd>
          <dt>
            Elapsed search time (ms)
          </dt>
          <dd id="elapsed-time">
            0
          </dd>
          <dt>
            Path Cost
          </dt>
          <dd id="path-cost">
            0
          </dd>
          <dt>
            Solution Path
          </dt>
          <dd id="solution">
            ...
          </dd>
        </dl>
      </div>
    </div>
    <div class="col-md-6">
      <h3>A Map</h3>
      <figure>
        <img class="smallish" src="img/romania-distances.png" alt="Simplified map of Romanian cities" />
        <figcaption>A simplified map of Romanian cities from the <cite><a href="http://aima.cs.berkeley.edu/figures.html">AIMA
              figures page</a></cite>.</figcaption>
      </figure>
    </div>
  </div>

  </div>
`;

export default class AiSearchView extends Backbone.View {
  preinitialize() {
    this.events = {
      "click #search": "runSearch"
    };
  }

  constructor() {
    super();

    this.romania = new Romania();
  }

  runSearch(e) {
    e.preventDefault();

    $('#results').hide(100);

    let searchAlgorithm = $('#search-algorithm').val();
    let search = null;

    this.romania.initialState = this.$fromCity.val();
    this.romania.goalState = this.$toCity.val();

    switch (searchAlgorithm) {
      case 'tree-search':
        search = new TreeSearch(this.romania);
        break;
      case 'graph-search-bfs':
        search = new BreadthFirstSearch(this.romania);
        break;
      case 'graph-search-dfs':
        search = new DepthFirstSearch(this.romania);
        break;
      case 'uniform-cost-search':
        search = new UniformCostSearch(this.romania);
        break;
    }

    search.search();

    $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
    $('#nodes-used').text(search.nodesUsed);

    let $pathCost = $('#path-cost');
    let $solution = $('#solution');
    $solution.text(this.romania.initialState);
    $solution.append($('<br />'));

    for (let x = 0; x < search.solution.length; x++) {
      $solution.append(search.solution[x].action);
      $pathCost.text(search.solution[x].pathCost);
      if (x < search.solution.length - 1) {
        $solution.append($('<br />'));
      }
    }

    $('#results').show(500);
  }

  render() {
    render(template(), this.el);

    this.$fromCity = this.$('#from-city');
    this.$toCity = this.$('#to-city');

    for (const city of this.romania.cities.sort()) {
      this.$fromCity.append($('<option value="' + city + '">' + city + '</option>'));
      this.$toCity.append($('<option value="' + city + '">' + city + '</option>'));
    }

    return this;
  }
}