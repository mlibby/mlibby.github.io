import GraphSearch from "./graph-search.js";
import LifoFrontier from "./lifo-frontier.js";

export default
class DepthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new LifoFrontier());
    }
}