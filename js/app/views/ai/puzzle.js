"use strict";

import { html, render } from "/js/lib/lit-html/lit-html.js";
import Puzzle from "../../ai/puzzle.js";
import BreadthFirstSearch from "../../ai/graph-search-bfs.js";
import DepthFirstSearch from "../../ai/graph-search-dfs.js";
import UniformCostSearch from "../../ai/uniform-cost-search.js";

const template = (d) => html`
<div class="ai">
  <div class="row">
    <div class="col-sm-12">
      <h2>AI: Solve the 8 Puzzle</h2>
      <p>
        The 8 Puzzle consists of a 3x3 board with eight numbered tiles and an empty spot. A tile adjacent to the empty
        spot can slide into that spot. The goal of the puzzle is to order all of the tiles numerically, leaving the
        empty spot in the lower-right corner.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <h3>The Puzzle</h3>
      <div id="puzzle">
        <div class="puzzle-row">
          <div id="spot-1" class="puzzle-spot">
            <div id="number-1" class="tile">1</div>
          </div>
          <div id="spot-2" class="puzzle-spot">
            <div id="number-2" class="tile">2</div>
          </div>
          <div id="spot-3" class="puzzle-spot">
            <div id="number-3" class="tile">3</div>
          </div>
        </div>
        <div class="puzzle-row">
          <div id="spot-4" class="puzzle-spot">
            <div id="number-4" class="tile">4</div>
          </div>
          <div id="spot-5" class="puzzle-spot">
            <div id="number-5" class="tile">5</div>
          </div>
          <div id="spot-6" class="puzzle-spot">
            <div id="number-6" class="tile">6</div>
          </div>
        </div>
        <div class="puzzle-row">
          <div id="spot-7" class="puzzle-spot">
            <div id="number-7" class="tile">7</div>
          </div>
          <div id="spot-8" class="puzzle-spot">
            <div id="number-8" class="tile">8</div>
          </div>
          <div id="spot-9" class="puzzle-spot">
            <div id="number-9" class="tile empty">&nbsp;</div>
          </div>
        </div>
      </div>
      <button id="shuffle-tiles" class="btn btn-primary">Shuffle Tiles</button>
      <p>Note: not all tile arrangments are guaranteed to be solvable.</p>

      <form class="form form-horizontal">
        <div class="form-group">
          <label for="search-algorithm" class="control-label">Choose Search Algorithm</label>
          <select id="search-algorithm" class="form-control">
            <option value="tree-search" disabled="disabled">Tree-Search</option>
            <option value="graph-search-bfs">Graph-Search (breadth first)</option>
            <option value="graph-search-dfs">Graph-Search (depth first)</option>
            <option value="uniform-cost-search">Uniform-Cost-Search</option>
          </select>
        </div>
        <div class="form-group">
          <button id="solve-puzzle" class="btn btn-primary">Solve Puzzle</button>
        </div>
      </form>
    </div>
    <div class="col-sm-6">
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
      <form class="form">
        <div class="form-group">
          <button id="watch-solution" disabled="disabled" class="btn btn-primary">Watch Solution</button>
        </div>
      </form>
    </div>
  </div>
</div>
`;

export default class AiPuzzleView extends Backbone.View {
  preinitialize() {
    this.events = {
      "click #shuffle-tiles": "shuffleTiles",
      "click #watch-solution": "watchSolution",
      "click #solve-puzzle": "solvePuzzle"
    };
  }

  constructor() {
    super();
    this.puzzle = null;
    this.puzzleSolution = null;
    this.$elapsedTime = null;
    this.$nodesUsed = null;
    this.$pathCost = null;
    this.$solution = null;
    this.$watchSolution = null;
  }

  shuffleTiles(e) {
    e.preventDefault();
    this.refreshPuzzle();
  }

  displayPuzzle(puzzle) {
    $.each(this.puzzle.initialState.split(''), (index, tileValue) => {
      let spot = $('#spot-' + (index + 1));
      let tile = $('#number-' + tileValue).remove();
      spot.append(tile);
    });
  }

  solvePuzzle(e) {
    e.preventDefault();
    if (this.puzzle === null) {
      alert("Shuffle the tiles, eh?");
    }

    this.clearResults();

    let search = this.getSearch();
    search.search();

    this.displayResults(search);
  }

  refreshPuzzle() {
    this.puzzle = new Puzzle();
    this.displayPuzzle(this.puzzle);
  }

  clearResults() {
    this.$elapsedTime.text('...');
    this.$nodesUsed.text('...');
    this.$pathCost.text('...');
    this.$solution.text('...');
  }

  displayResults(search) {
    this.$elapsedTime.text((search.endTime - search.startTime).toFixed(6));
    this.$nodesUsed.text(search.nodesUsed);

    if (search.solution.length > 0) {
      this.$pathCost.text(search.solution[search.solution.length - 1].pathCost);
      this.$solution.text('');
      this.$solution.append(search.solution.map((node) => node.action).join(', '));
      this.$watchSolution.removeAttr('disabled');
    }
    else {
      this.$solution.text('Failed to find solution');
      this.$watchSolution.attr('disabled', 'disabled');
    }
  }

  getSearch() {
    let searchAlgorithm = $('#search-algorithm').val();
    let search = null;

    switch (searchAlgorithm) {
      case 'graph-search-bfs':
        search = new BreadthFirstSearch(this.puzzle);
        break;
      case 'graph-search-dfs':
        search = new DepthFirstSearch(this.puzzle);
        break;
      case 'uniform-cost-search':
        search = new UniformCostSearch(this.puzzle);
        break;
    }

    return search;
  }

  slideTile(tileNumber) {
    let $tile = $("#number-" + tileNumber);
    let $empty = $("#number-9");
    let tilePosition = $tile.position();
    let emptyPosition = $empty.position();
    let newTop = emptyPosition.top - tilePosition.top;
    let newLeft = emptyPosition.left - tilePosition.left;
    $tile.animate({ top: newTop, left: newLeft }, 333, () => {
      let $emptySpot = $empty.parent();
      let $tileSpot = $tile.parent();
      $empty.remove();
      $tile.remove();
      $tile.css('top', 0);
      $tile.css('left', 0);
      $emptySpot.append($tile);
      $tileSpot.append($empty);
      this.watchSolution();
    });
  }

  watchSolution() {
    this.$watchSolution.attr('disabled', 'disabled');
    this.puzzleSolution = this.puzzleSolution || this.$solution.text().split(', ');

    if (this.puzzleSolution.length > 0) {
      let move = this.puzzleSolution.shift();
      this.slideTile(move);
    }
    else {
      this.puzzleSolution = null;
    }
  }

  render() {
    render(template(), this.el);

    this.$elapsedTime = this.$('#elapsed-time');
    this.$nodesUsed = this.$('#nodes-used');
    this.$pathCost = this.$('#path-cost');
    this.$solution = this.$('#solution');
    this.$watchSolution = this.$('#watch-solution');

    return this;
  }
}