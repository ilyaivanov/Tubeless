import {Node, TreeInfo} from "./types";

export const updateNode = (tree: TreeInfo, id: string, updated: (node: Node) => Partial<Node>): TreeInfo => {
  return {
    ...tree,
    nodes: {
      ...tree.nodes,
      [id]: {
        ...tree.nodes[id],
        ...updated(tree.nodes[id]),
      }
    }
  };;
}
