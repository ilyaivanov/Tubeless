import { Placement, Tree } from "./types";
import { handleDrop } from "./dropRules";

const threeNodes: Tree = {
    nodes: {
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
    },
    roots: ['1', '2', '3']
};

it('when droping second item before first it should place second item at the beggining', () => {
    const action: Placement = {
        itemBeingDragged: '2',
        highlightPlacement: 'PLACE_BEFORE',
        id: '1',
        relativeShift: 0
    };
    const expectedTree = {
        nodes: threeNodes.nodes,
        roots: ['2', '1', '3']
    };
    expect(handleDrop(threeNodes, action)).toEqual(expectedTree);
})


it('when droping third item before second it should place third item between second and first', () => {
    const action: Placement = {
        itemBeingDragged: '3',
        highlightPlacement: 'PLACE_BEFORE',
        id: '2',
        relativeShift: 0
    };
    const expectedRoots = ['1', '3', '2'];

    expect(handleDrop(threeNodes, action).roots).toEqual(expectedRoots);
})

