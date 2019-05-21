import React, { Ref, useImperativeHandle, useRef } from "react";
import {Node, Nodes, Placement} from "./types";
import {Arrow, Border, Bullet, NodeContainer, VideoPreview} from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";
import NodeTitle from "./NodeTitle";
import { TreeProps } from "./Tree";
import {onSearchDone, onSearchStart, toggleVisibility} from "./treeActions";
import {searchSimilar} from "../youtube/api";
import {mapVideosToNodes} from "../youtube/mapVideosToNodes";

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
      nodes,
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

    const onToggleCollapse = (id: string) => {
      if (nodes[id].type === "video") {
        setNodes(onSearchStart(nodes, id));
        searchSimilar(nodes[id].videoUrl as string).then(response => {
          setNodes(onSearchDone(nodes, id, mapVideosToNodes(response)));
        });
      } else {
        setNodes(toggleVisibility(nodes, id));
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
          {node.type === "video" ? (
            <VideoPreview
              alt="Cover image"
              onClick={() => onPlay(node)}
              ref={connectDragSource}
              src={node.imageUrl}
              data-testid={`video-image-${node.id}`}
            />
          ) : (
            <Bullet itemId={node.id} ref={connectDragSource} />
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
