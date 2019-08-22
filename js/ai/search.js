import Romania from "/js/src/ai/romania.js";
import DepthFirstSearch from "/js/src/ai/graph-search-dfs.js";
import UniformCostSearch from "/js/src/ai/uniform-cost-search.js";
import TreeSearch from "/js/src/ai/tree-search.js";
import BreadthFirstSearch from "/js/src/ai/graph-search-bfs.js";

"use strict";

$(document).ready(() => {
  let romania = new Romania();

  let $fromCity = $('#from-city');
  let $toCity = $('#to-city');

  for (const city of romania.cities.sort()) {
    $fromCity.append($('<option value="' + city + '">' + city + '</option>'));
    $toCity.append($('<option value="' + city + '">' + city + '</option>'));
  }

  $("#search").click(runSearch);

  function runSearch(e) {
    e.preventDefault();

    $('#results').hide(100);

    let searchAlgorithm = $('#search-algorithm').val();
    let search = null;

    romania.initialState = $fromCity.val();
    romania.goalState = $toCity.val();

    switch (searchAlgorithm) {
      case 'tree-search':
        search = new TreeSearch(romania);
        break;
      case 'graph-search-bfs':
        search = new BreadthFirstSearch(romania);
        break;
      case 'graph-search-dfs':
        search = new DepthFirstSearch(romania);
        break;
      case 'uniform-cost-search':
        search = new UniformCostSearch(romania);
        break;
    }

    search.search();

    $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
    $('#nodes-used').text(search.nodesUsed);

    let $pathCost = $('#path-cost');
    let $solution = $('#solution');
    $solution.text(romania.initialState);
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
});