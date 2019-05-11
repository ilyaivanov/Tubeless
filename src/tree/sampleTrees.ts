import {TreeInfo} from "./types";

export const twoNestedNodes: TreeInfo = {
  nodes: {
    '1': {
      id: '1',
      text: 'Node 1',
      children: ['2']
    },
    '2': {
      id: '2',
      text: 'Node 2',
    },
  },
  roots: ['1']
};
