import { Nodes } from "../tree/types";
import { node } from "../tree/sampleTrees";
import { copyNode } from "./nodes.utils";

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
  const res = copyNode(nodes, "parent", "newParent");

  expect(res["newParent"].text).toEqual("Node parent");
  expect(res["newChild"].text).toEqual("Node child");
  expect(res["newGrandChild"].text).toEqual("Node grand-child");
});