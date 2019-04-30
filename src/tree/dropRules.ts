import { Nodes, Placement, Tree } from "./types";
import { except } from "./rules";


export function handleDrop(tree: Tree, action: Placement): Tree{
    const nodes = {
        ...tree.nodes
    }
    return {
        nodes,
        roots: [action.itemBeingDragged].concat(except(tree.roots, action.itemBeingDragged)),
    };
  }