import { Node, Nodes, Placement, Roots } from "../tree/types";
import { except, contains, first } from "./array.utils";
import { YoutubeVideoResponse } from "../youtube/api";

export const removeNode = (nodes: Nodes, nodeId: string) => {
  const parent = validateParent(getParentKey(nodes, nodeId), nodeId);
  return updateNode(nodes, parent, node => ({
    children: except(node.children, nodeId)
  }));
};

//TODO: ugly code, consider to refactor it
export const copyNode = (
  nodes: Nodes,
  nodeId: string,
  newNodeId: string
): Nodes => {
  let newNodes;
  const children = nodes[nodeId].children;
  if (children) {
    const newIds = children.map(() => createId());

    newNodes = newIds.reduce((state, newId, index) => {
      return copyNode(state, children[index], newId);
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

export const getItemLevel = (nodes: Nodes, nodeId: string) =>
  getNodePath(nodes, nodeId).length - 2;

export const getRootKey = (nodes: Nodes, nodeId: string): string =>
  first(getNodePath(nodes, nodeId));

const getNodePath = (nodes: Nodes, nodeId: string) => {
  let path = [nodeId];
  let parent = getParentKey(nodes, nodeId);
  while (parent) {
    path = [parent].concat(path);
    parent = getParentKey(nodes, parent);
  }
  return path;
};

export const getParentKey = (
  nodes: Nodes,
  nodeId: string
): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));

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

export function insertDragItemAtPlacement(
  context: string[],
  action: Placement
): string[] {
  let index = context.indexOf(action.id);
  const targetIndex = action.orientation === "AFTER" ? index + 1 : index;
  const copy = [...context];
  copy.splice(targetIndex, 0, action.itemBeingDragged);
  return copy;
}

export const setVideosAsChildren = (nodes: Nodes, nodeId:string, videoNodes: YoutubeVideoResponse) => {
  const children = videoNodes.videos.map(() => createId());
  const some = updateNode(nodes, nodeId, () => ({ children }));

  const res = videoNodes.videos.reduce((state, video, index) => {
    return createNode(state, {
      text: video.title,
      id: children[index],
      type: "video",
      videoUrl: video.videoId,
      imageUrl: video.previewUrl,
      isHidden: true
    });
  }, some);
  return res;
};

export const validateParent = (
  parentId: string | undefined,
  nodeId: string
): string => {
  if (!parentId)
    throw new Error(
      "Expected parent for node " + nodeId + ", but not " + parentId
    );
  return parentId;
};

export const createNode = (nodes: Nodes, node: Node): Nodes => {
  return { ...nodes, [node.id]: node };
};

//ID utils
export const createId = (): string => {
  return Math.random() + "";
};
