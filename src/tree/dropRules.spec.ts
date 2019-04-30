import { Placement, Tree } from "./types";
import { handleDrop } from "./dropRules";

const threeNodes = {
    '1': {
        id: '1',
        text: 'First'
    },
    '2': {
        id: '2',
        text: 'Second'
    },
    '3': {
        id: '3',
        text: 'Third'
    },
}

it('when droping second item before first it should place second item at the beggining', () => {
    const tree: Tree = {
        nodes: threeNodes,
        roots: ['1', '2']
    };
    const action: Placement = {
        itemBeingDragged: '2',
        highlightPlacement: 'PLACE_BEFORE',
        id: '1',
        relativeShift: 0
    };
    const expectedTree = {
        nodes: tree.nodes,
        roots: ['2', '1']
    };
    expect(handleDrop(tree, action)).toEqual(expectedTree);
})