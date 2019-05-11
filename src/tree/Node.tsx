import React, { useImperativeHandle, useRef } from "react";
import { Node } from "./types";
import {
  Arrow,
  Border,
  Circle,
  CircleContainer,
  NodeContainer,
  Text
} from "./components";
import { TreeDragSource, TreeDropTarget } from "./dnd";

interface Props {
  children: any;
  level: number;
  node: Node;
  placement: any;
  onToggleCollapse: any;
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
    }: Props,
    ref: any
  ) => {
    const elementRef = useRef(null);

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
            <Border level={level} position={placement.orientation} data-testid={"border-"+node.id} />
          )}
        </NodeContainer>
        {children}
      </div>
    );
  }
);

const Bullet = React.forwardRef(({ onClick, myRef, itemId }: any, ref: any) => (
  <CircleContainer
    onClick={onClick}
    ref={ref}
    data-testid={"drag-handle-" + itemId}
  >
    <Circle
      width={18}
      color="rgb(220, 224, 226)"
      hoverColor={"rgb(183, 188, 191)"}
    >
      <Circle width={8} color="rgb(75, 81, 85)" />
    </Circle>
  </CircleContainer>
));

export default TreeDropTarget(TreeDragSource(NodeElement));
