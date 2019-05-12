import React, { Ref, RefObject, useImperativeHandle, useRef } from "react";
import { Node, Placement } from "./types";
import {
  Arrow,
  Border,
  Circle,
  CircleContainer,
  NodeContainer,
  Text
} from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";

export interface NodeProps {
  children: JSX.Element;
  level: number;
  node: Node;
  placement: Placement;
  setPlacement: (placement: Partial<Placement>) => void;
  onToggleCollapse: (id: string) => void;
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
      placement
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
            data-testid="arrow"
            onClick={() => onToggleCollapse(node.id)}
          />
          <Bullet itemId={node.id} ref={connectDragSource} />
          <Text>{node.text}</Text>
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

interface BulletProps {
  itemId: string;
}

const Bullet = React.forwardRef(
  ({ itemId }: BulletProps, ref: Ref<HTMLDivElement>) => (
    <CircleContainer ref={ref} data-testid={"drag-handle-" + itemId}>
      <Circle
        width={18}
        color="rgb(220, 224, 226)"
        hoverColor={"rgb(183, 188, 191)"}
      >
        <Circle width={8} color="rgb(75, 81, 85)" />
      </Circle>
    </CircleContainer>
  )
);

export default TreeDropTarget(TreeDragSource(NodeElement));
