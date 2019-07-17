import { Nodes } from "./types";
import { node } from "./sampleTrees";
import { copyNodeDeep, getNextNodeId } from "./treeOperations";

it("it should also copy all subnodes", () => {
  const nodes: Nodes = {
    ...node("parent", ["child"]),
    ...node("child", ["grand-child"]),
    ...node("grand-child")
  };
  const fn = jest.fn();
  fn.mockReturnValueOnce("newChild");
  fn.mockReturnValueOnce("newGrandChild");
  Math.random = fn;
  const res = copyNodeDeep(nodes, "parent", "newParent");

  expect(res["newParent"].text).toEqual("Node parent");
  expect(res["newChild"].text).toEqual("Node child");
  expect(res["newGrandChild"].text).toEqual("Node grand-child");
});

describe("having a flat list of three nodes", () => {
  const nodes: Nodes = {
    ...node("root", ["node1", "node2", "node3"]),
    ...node("node1"),
    ...node("node2"),
    ...node("node3")
  };

  it("getting next item for the second one should return third", () => {
    expect(getNextNodeId(nodes, "node2")).toEqual("node3");
  });

  it('getting next item for the third one should return nothing', () => {
    expect(getNextNodeId(nodes, "node3")).toBeUndefined();
  });
});
