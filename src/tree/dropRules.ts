import { Nodes, Placement, Tree } from "./types";
import { except } from "./rules";


export function handleDrop(tree: Tree, action: Placement): Tree {
    const nodes = {
        ...tree.nodes
    }
    const index = tree.roots.indexOf(action.id);
    //place itemBeingDragged into index position
    return {
        nodes,
        roots: moveItemIntoIndex(tree.roots, action.itemBeingDragged, index)
    };
}

//TODO: handle case when moving item forward or backward
function moveItemIntoIndex<T>(items: T[], itemToMove: T, targetIndex: number): T[] {
    const removed = except([...items], itemToMove);
    removed.splice(targetIndex, 0, itemToMove);
    return removed;
}