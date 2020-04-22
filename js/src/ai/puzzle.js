import Searchable from "./searchable.js";
import SearchNode from "./search-node.js";

let slideMatrix = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7]
};

let hexDigit = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
}

export default
    class Puzzle extends Searchable {
    constructor(initialState, goalState) {
        initialState = initialState || _.shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8']).join('');
        goalState = goalState || '012345678';
        super(initialState, goalState);
        this.slideMatrix = slideMatrix;
        this.emptySpotLabel = '8';

    }

    expandNode(node) {
        let expandeds = [];

        let emptySpot = node.state.indexOf(this.emptySpotLabel);

        let moves = this.slideMatrix[emptySpot];
        for (const move of moves) {
            let moveIndex = hexDigit[move];
            let tileValue = node.state[moveIndex];
            let state = node.state.replace(this.emptySpotLabel, 'x').replace(tileValue, this.emptySpotLabel).replace('x', tileValue);
            let newNode = new SearchNode(state, node, tileValue, node.pathCost + 1);
            expandeds.push(newNode);
        }

        return expandeds;
    }
}