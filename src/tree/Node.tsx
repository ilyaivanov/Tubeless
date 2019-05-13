import React, { Ref, useImperativeHandle, useRef } from "react";
import { Node, Placement, TreeInfo } from "./types";
import { Arrow, Border, Bullet, NodeContainer, NodeText, NodeIcons } from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";

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
            <img onClick={() => onPlay(node)} data-testid={`video-image-${node.id}`} src={node.imageUrl} alt="Cover image" style={{height: 18, width: 18, paddingRight: 5}} ref={connectDragSource}/>
          ) : (
            <Bullet itemId={node.id} ref={connectDragSource} />
          )}
          <NodeText>{node.text}</NodeText>
          <NodeIcons nodeId={node.id} onEdit={() => 42} onDelete={() => onDelete(node)}/>
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
