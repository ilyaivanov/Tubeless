import React, { Ref, useImperativeHandle, useRef } from "react";
import { Node, Placement, TreeInfo } from "./types";
import { Arrow, Border, Bullet, NodeContainer } from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";
import NodeTitle from "./NodeTitle";

export interface NodeProps {
  children: JSX.Element;
  level: number;
  node: Node;
  tree: TreeInfo;
  placement: Placement;
  setPlacement: (placement: Partial<Placement>) => void;
  onToggleCollapse: (id: string) => void;
  onPlay: (nodeId: Node) => void;
  onDelete: (nodeId: Node) => void;
  onUpdate: (nodeId: Partial<Node>) => void;
  onDrop: () => void;
  connectDragSource: any;
  connectDropTarget: any;
}

const NodeElement = React.forwardRef(
  (
    {
      children,
      node,
      level,
      onToggleCollapse,
      connectDragSource,
      connectDropTarget,
      placement,
      onPlay,
      onDelete,
      onUpdate
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
            onClick={() => onToggleCollapse(node.id)}
          />
          {node.type === "video" ? (
            <img
              onClick={() => onPlay(node)}
              data-testid={`video-image-${node.id}`}
              src={node.imageUrl}
              alt="Cover image"
              style={{ height: 32, width: 32, paddingRight: 5 }}
              ref={connectDragSource}
            />
          ) : (
            <Bullet itemId={node.id} ref={connectDragSource} />
          )}
          <NodeTitle node={node} onDelete={onDelete} onUpdate={onUpdate} />
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
