import { Node, Nodes, Placement } from "./types";
import {
  copyNodeDeep,
  createNode,
  deleteNode,
  getNodeLevel,
  getParentKey,
  getRootKey,
  updateNode
} from "./treeOperations";
import { createId } from "../utils";
import { validateParent } from "./treeValidation";
import { createPlaylistLoader } from "./sampleTrees";
import {
  getChannelVideos,
  getPlaylistsForChannel,
  getPlaylistVideos,
  searchSimilar,
  YoutubeResponse
} from "../youtube/api";
import { mapVideosToNodes } from "../youtube/mapVideosToNodes";

export const onCreateNode = (nodes: Nodes, parentId: string) => {
  const id = Math.random() + "";
  const node: Node = {
    text: "New Node",
    type: "Composite",
    id
  };
  const withChild = updateNode(nodes, parentId, node => ({
    children: (node.children as string[]).concat([id])
  }));
  return {
    ...withChild,
    [id]: node
  };
};

export const onDeleteNode = (nodes: Nodes, nodeId: string) =>
  deleteNode(nodes, nodeId);

export const onRenameNode = (nodes: Nodes, nodeId: string, newText: string) =>
  updateNode(nodes, nodeId, () => ({
    text: newText
  }));

export const onSearchStart = (nodes: Nodes, nodeId: string) =>
  updateNode(nodes, nodeId, () => ({
    isLoading: true
  }));

const addPlaylistsLoader = (nodes: Node[], channelId: string): Node[] =>
  [createPlaylistLoader(channelId)].concat(nodes);

export const loadMoreItems = (
  nodes: Nodes,
  id: string,
  setNodes: (nodes: Nodes) => void
) => {
  if (nodes[id].type === "Video") {
    setNodes(onSearchStart(nodes, id));
    searchSimilar(nodes[id].videoUrl as string, nodes[id].nextPageToken).then(
      response =>
        setNodes(onSearchDone(nodes, id, mapVideosToNodes(response), response))
    );
  } else if (nodes[id].type === "Playlist") {
    console.log(nodes[id])
    setNodes(onSearchStart(nodes, id));
    getPlaylistVideos(
      nodes[id].playlistId as string,
      nodes[id].nextPageToken
    ).then(response =>
      setNodes(onSearchDone(nodes, id, mapVideosToNodes(response), response))
    );
  } else if (nodes[id].type === "Channel") {
    const channelId = nodes[id].channelId as string;
    setNodes(onSearchStart(nodes, id));
    getChannelVideos(channelId, nodes[id].nextPageToken).then(response =>
      setNodes(
        onSearchDone(
          nodes,
          id,
          nodes[id].nextPageToken
            ? mapVideosToNodes(response)
            : addPlaylistsLoader(mapVideosToNodes(response), channelId),
          response
        )
      )
    );
  } else {
    const loader = nodes[id].loader;
    if (loader) {
      if (loader.type === "Playlists") {
        setNodes(onSearchStart(nodes, id));
        getPlaylistsForChannel(
          loader.channelId as string,
          nodes[id].nextPageToken
        ).then(response =>
          setNodes(
            onSearchDone(nodes, id, mapVideosToNodes(response), response)
          )
        );
      } else {
        throw new Error("Unexpected loader: " + loader.type);
      }
    }
  }
};

//TODO: there is an issue related to async state updates
export const onToggleCollapse = (
  nodes: Nodes,
  setNodes: (nodes: Nodes) => void,
  id: string
) => {
  const children = nodes[id].children;
  if (children && children.length > 0) {
    setNodes(toggleVisibility(nodes, id));
  } else {
    return loadMoreItems(nodes, id, setNodes);
  }
};

export const onSearchDone = (
  nodes: Nodes,
  parentId: string,
  newVideoNodes: Node[],
  response: YoutubeResponse,
  shouldOverride?: boolean
): Nodes => {
  const children = newVideoNodes.map(n => n.id);
  const withNodes = newVideoNodes.reduce(
    (state, node) => createNode(state, node),
    nodes
  );

  const withChildren = updateNode(withNodes, parentId, node => ({
    children: shouldOverride
      ? children
      : (node.children || []).concat(children),
    isLoading: false,
    isHidden: false
  }));
  return setNodePageInformation(withChildren, parentId, response);
};

const setNodePageInformation = (
  nodes: Nodes,
  nodeId: string,
  response: YoutubeResponse
) => {
  if (response.totalResults) {
    return updateNode(nodes, nodeId, () => ({
      titlePostfix:
        getChildCount(nodes[nodeId]) +
        (response.nextPageToken ? " out " + response.totalResults : ""),
      nextPageToken: response.nextPageToken
    }));
  }
  return nodes;
};

export const toggleVisibility = (nodes: Nodes, nodeId: string) =>
  updateNode(nodes, nodeId, node => ({
    isHidden: !node.isHidden
  }));

export const onDrop = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.itemBeingDragged === placement.id) return nodes;
  if (isDraggingFromDifferentScopes(nodes, placement)) {
    const newId = createId();
    const newPlacement = {
      ...placement,
      itemBeingDragged: newId
    };
    return insertNode(
      copyNodeDeep(nodes, placement.itemBeingDragged, newId),
      newPlacement
    );
  }
  return insertNode(deleteNode(nodes, placement.itemBeingDragged), placement);
};

const insertNode = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.dragLevel !== 0) {
    const nodeLevel = getNodeLevel(nodes, placement.id);
    if (placement.dragLevel > nodeLevel) {
      return updateNode(nodes, placement.id, node => ({
        children: [placement.itemBeingDragged].concat(node.children || [])
      }));
    }
  }

  const parent = validateParent(
    getParentKey(nodes, placement.id),
    placement.id
  );
  return updateNode(nodes, parent, node => ({
    children: insertDragItemAtPlacement(node.children as string[], placement)
  }));
};

const isDraggingFromDifferentScopes = (nodes: Nodes, placement: Placement) =>
  getRootKey(nodes, placement.id) !==
  getRootKey(nodes, placement.itemBeingDragged);

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

const getChildCount = (node: Node) =>
  node.children ? node.children.length : 0;
