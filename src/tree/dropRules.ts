import { Placement, Tree } from "./types";
import { moveItemIntoIndex, getParentKey } from "./rules";


export function handleDrop(tree: Tree, action: Placement): Tree {
    const dropTargetParent = getParentKey(tree.nodes, action.id);
    const draggedItemParent = getParentKey(tree.nodes, action.itemBeingDragged);
    console.trace();
    console.log(dropTargetParent, draggedItemParent)
    if (dropTargetParent && draggedItemParent && dropTargetParent == draggedItemParent) {
        return {
            nodes: {
                ...tree.nodes,
                [dropTargetParent]: {
                    ...tree.nodes[dropTargetParent],
                    children: moveItemInContext(tree.nodes[dropTargetParent].children as string[], action)
                }
            },
            roots: tree.roots
        };
    } else if (!draggedItemParent && !dropTargetParent) {
        return {
            nodes: tree.nodes,
            roots: moveItemInContext(tree.roots, action)
        };
    }else {

        return {
            nodes: tree.nodes,
            roots: moveItemInContext(tree.roots, action)
        }
    }
}


function moveItemInContext(context: string[], action: Placement): string[] {
    let index = context.indexOf(action.id);
    const targetIndex = action.highlightPlacement === 'PLACE_AFTER' ? index + 1 : index;
    return moveItemIntoIndex(context, action.itemBeingDragged, targetIndex)
}
