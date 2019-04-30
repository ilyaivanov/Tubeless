import { Placement, Tree } from "./types";
import { moveItemIntoIndex } from "./rules";


export function handleDrop(tree: Tree, action: Placement): Tree {
    const nodes = {
        ...tree.nodes
    }
    let index = tree.roots.indexOf(action.id);
    const targetIndex = action.highlightPlacement === 'PLACE_AFTER' ? index + 1 : index;
    return {
        nodes,
        roots: moveItemIntoIndex(tree.roots, action.itemBeingDragged, targetIndex)
    };
}

