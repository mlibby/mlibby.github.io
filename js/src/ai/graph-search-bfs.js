import GraphSearch from "./graph-search.js";
import FifoFrontier from "./fifo-frontier.js";

export default 
class BreadthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new FifoFrontier());
    }
}