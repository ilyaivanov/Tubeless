import React, { Ref, useImperativeHandle, useRef } from "react";
import { Node, Nodes, Placement } from "./types";
import {
  Arrow,
  Border,
  Bullet,
  NodeContainer,
  VideoPreview
} from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";
import NodeTitle from "./NodeTitle";
import { TreeProps } from "./Tree";
import { onSearchDone, onSearchStart, toggleVisibility } from "./treeActions";
import {
  searchSimilar,
  getPlaylistVideos,
  getChannelVideos,
  getPlaylistsForChannel
} from "../youtube/api";
import { mapVideosToNodes } from "../youtube/mapVideosToNodes";
import { createPlaylistLoader } from "./sampleTrees";

export interface NodeProps extends TreeProps {
  children: JSX.Element;
  level: number;
  node: Node;
  setNodes: (nodes: Nodes) => void;
  placement: Placement;
  setPlacement: (placement: Partial<Placement>) => void;
  onPlay: (nodeId: Node) => void;
  connectDragSource: any;
  connectDropTarget: any;
}

const NodeElement = React.forwardRef(
  (
    {
      children,
      node,
      level,
      connectDragSource,
      connectDropTarget,
      placement,
      onPlay,
      setNodes,
      nodes
    }: NodeProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const elementRef = useRef<HTMLDivElement>(null);

    // @ts-ignore
    useImperativeHandle(ref, () => {
      connectDropTarget(elementRef);
      return {
        getNode: () => elementRef.current
      };
    });

    const addPlaylistsLoader = (nodes: Node[], channelId: string): Node[] =>
      [createPlaylistLoader(channelId)].concat(nodes);

    const onToggleCollapse = (id: string) => {
      const children = nodes[id].children;
      if (children && children.length > 0) {
        setNodes(toggleVisibility(nodes, id));
      } else if (nodes[id].type === "Video") {
        setNodes(onSearchStart(nodes, id));
        searchSimilar(nodes[id].videoUrl as string).then(response => {
          setNodes(onSearchDone(nodes, id, mapVideosToNodes(response)));
        });
      } else if (nodes[id].type === "Playlist") {
        setNodes(onSearchStart(nodes, id));
        getPlaylistVideos(nodes[id].playlistId as string).then(response =>
          setNodes(onSearchDone(nodes, id, mapVideosToNodes(response)))
        );
      } else if (nodes[id].type === "Channel") {
        const channelId = nodes[id].channelId as string;
        setNodes(onSearchStart(nodes, id));
        getChannelVideos(channelId).then(response =>
          setNodes(
            onSearchDone(
              nodes,
              id,
              addPlaylistsLoader(mapVideosToNodes(response), channelId)
            )
          )
        );
      } else {
        const loader = nodes[id].loader;
        if (loader) {
          if (loader.type === "Playlists") {
            setNodes(onSearchStart(nodes, id));
            getPlaylistsForChannel(loader.channelId as string).then(response =>
              setNodes(onSearchDone(nodes, id, mapVideosToNodes(response)))
            );
          } else {
            throw new Error("Unexpected loader: " + loader.type);
          }
        } else {
          setNodes(toggleVisibility(nodes, id));
        }
      }
    };

    return (
      <div>
        <NodeContainer
          data-testid={"node-" + node.id}
          level={level}
          ref={elementRef}
        >
          <Arrow
            orientation={node.isHidden ? "right" : "down"}
            nodeId={node.id}
            onClick={() => onToggleCollapse(node.id)}
          />
          {node.type !== "Composite" ? (
            <VideoPreview
              type={node.type}
              alt="Cover image"
              onClick={() => onPlay(node)}
              ref={connectDragSource}
              src={node.imageUrl}
              data-testid={`video-image-${node.id}`}
            />
          ) : (
            <Bullet node={node} ref={connectDragSource} />
          )}
          <NodeTitle setNodes={setNodes} nodes={nodes} node={node} />
          {node.id === placement.id && (
            <Border
              placement={placement}
              level={level}
              data-testid={"border-" + node.id}
            />
          )}
        </NodeContainer>
        {children}
      </div>
    );
  }
);

export default TreeDropTarget(TreeDragSource(NodeElement));
