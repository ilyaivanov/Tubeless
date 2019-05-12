import { TreeInfo } from "./types";

export const twoNestedNodes: TreeInfo = {
  nodes: {
    ...node("1", ["2"]),
    ...node("2")
  },
  roots: ["1"]
};

export const mediumSizedTree: TreeInfo = {
  nodes: {
    ...node("1", ["1.1", "1.2"]),
    ...node("1.1"),
    ...node("1.2", ["1.2.1"]),
    ...node("1.2.1"),
    ...node("2", ["2.1"]),
    ...node("2.1", ["2.1.1"]),
    ...node("2.1.1")
  },
  roots: ["1", "2"]
};

export const sampleNodes = mediumSizedTree;

function node(id: string, children?: string[]) {
  return {
    [id]: {
      id,
      text: "Node " + id,
      children
    }
  };
}
