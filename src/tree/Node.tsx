import React, { Ref, useImperativeHandle, useRef } from "react";
import { Node, Nodes, Placement } from "./types";
import {
  Arrow,
  Border,
  Bullet, LEVEL_SHIFT,
  NodeContainer,
  VideoPreview
} from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";
import NodeTitle from "./NodeTitle";
import { TreeProps } from "./Tree";
import {loadMoreItems, onToggleCollapse} from "./treeActions";

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
            onClick={() => onToggleCollapse(nodes, setNodes, node.id)}
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
        {(node.nextPageToken && !node.isHidden) && <button style={{marginLeft: level * LEVEL_SHIFT}} onClick={() => loadMoreItems(nodes, node.id, setNodes)}>more</button>}
      </div>
    );
  }
);

export default TreeDropTarget(TreeDragSource(NodeElement));
