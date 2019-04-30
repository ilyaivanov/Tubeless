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

const createBeforePlacement = (placememt: Partial<Placement>): Placement => ({
    relativeShift: 0,
    highlightPlacement: 'PLACE_BEFORE',
    id: '',
    itemBeingDragged: '',
    ...placememt,
});

const createAfterPlacement = (placememt: Partial<Placement>): Placement => ({
    relativeShift: 0,
    highlightPlacement: 'PLACE_AFTER',
    id: '',
    itemBeingDragged: '',
    ...placememt,
})

it('droping second item before first', () => {
    const action: Placement = createBeforePlacement({
        itemBeingDragged: '2',
        id: '1',
    });
    const expectedTree = {
        nodes: threeNodes.nodes,
        roots: ['2', '1', '3']
    };
    expect(handleDrop(threeNodes, action)).toEqual(expectedTree);
})


it('droping third item before second', () => {
    const action: Placement = createBeforePlacement({
        itemBeingDragged: '3',
        id: '2',
    });
    const expectedRoots = ['1', '3', '2'];

    expect(handleDrop(threeNodes, action).roots).toEqual(expectedRoots);

})

it('droping first item before second', () => {
    const action: Placement = createBeforePlacement({
        itemBeingDragged: '1',
        id: '2',
    });
    const expectedRoots = ['1', '2', '3'];

    expect(handleDrop(threeNodes, action).roots).toEqual(expectedRoots);
});


it('droping first item before third', () => {
    const action: Placement = createBeforePlacement({
        itemBeingDragged: '1',
        id: '3',
    });
    const expectedRoots = ['2', '1', '3'];

    expect(handleDrop(threeNodes, action).roots).toEqual(expectedRoots);
});


it('droping first item after second', () => {
    const action: Placement = createAfterPlacement({
        itemBeingDragged: '1',
        id: '2',
    });
    const expectedRoots = ['2', '1', '3'];

    expect(handleDrop(threeNodes, action).roots).toEqual(expectedRoots);
});
