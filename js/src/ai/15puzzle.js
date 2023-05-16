import Puzzle from "./puzzle.js"

let slideMatrix = {
    '0': ['1', '4'],
    '1': ['0', '2', '5'],
    '2': ['1', '3', '6'],
    '3': ['2', '7'],

    '4': ['0', '5', '8'],
    '5': ['4', '1', '6', '9'],
    '6': ['5', '2', '7', 'a'],
    '7': ['6', '3', 'b'],
 
    '8': ['4', '9', 'c'],
    '9': ['8', '5', 'a', 'd'],
    '10': ['9', '6', 'b', 'e'],
    '11': ['a', '7', 'f'],
 
    '12': ['8', 'd'],
    '13': ['c', '9', 'e'],
    '14': ['d', 'a', 'f'],
    '15': ['e', 'b']
};

export default
class FifteenPuzzle extends Puzzle {
    constructor() {
        let initialState = _.shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']).join('');
        let goalState = '0123456789abcdef';
        super(initialState, goalState);
        this.slideMatrix = slideMatrix;
        this.emptySpotLabel = 'f';
    }
}