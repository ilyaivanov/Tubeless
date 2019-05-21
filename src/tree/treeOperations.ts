import { Node, Nodes } from "./types";
import { createId, contains, except, first } from "../utils";
import { validateParent } from "./treeValidation";

export const createNode = (nodes: Nodes, node: Node): Nodes => {
  return { ...nodes, [node.id]: node };
};

export const updateNode = (
  nodes: Nodes,
  id: string,
  updated: (node: Node) => Partial<Node>
): Nodes => {
  return {
    ...nodes,
    [id]: {
      ...nodes[id],
      ...updated(nodes[id])
    }
  };
};

export const deleteNode = (nodes: Nodes, nodeId: string) => {
  const parent = validateParent(getParentKey(nodes, nodeId), nodeId);
  const res  = updateNode(nodes, parent, node => ({
    children: except(node.children, nodeId)
  }));
  return res;
};

export const getNodeLevel = (nodes: Nodes, nodeId: string) =>
  getNodePath(nodes, nodeId).length - 2;

export const getRootKey = (nodes: Nodes, nodeId: string): string =>
  first(getNodePath(nodes, nodeId));

export const getParentKey = (
  nodes: Nodes,
  nodeId: string
): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));

const getNodePath = (nodes: Nodes, nodeId: string) => {
  let path = [nodeId];
  let parent = getParentKey(nodes, nodeId);
  while (parent) {
    path = [parent].concat(path);
    parent = getParentKey(nodes, parent);
  }
  return path;
};

//TODO: ugly code, consider to refactor it
export const copyNodeDeep = (
  nodes: Nodes,
  nodeId: string,
  newNodeId: string
): Nodes => {
  let newNodes;
  const children = nodes[nodeId].children;
  if (children) {
    const newIds = children.map(() => createId());

    newNodes = newIds.reduce((state, newId, index) => {
      return copyNodeDeep(state, children[index], newId);
    }, nodes);
    newNodes = updateNode(newNodes, newNodeId, node => ({
      ...node,
      children: newIds
    }));
  } else {
    newNodes = nodes;
  }
  return {
    ...newNodes,
    [newNodeId]: {
      ...newNodes[nodeId],
      children: newNodes[newNodeId] ? newNodes[newNodeId].children : undefined,
      id: newNodeId
    }
  };
};
