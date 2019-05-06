import React, { useImperativeHandle, useRef } from "react";
import DragSource from "../dndTree/DragSource";
import {
  AddNewNodeItem,
  Bullet,
  Highlighted,
  ChildrenSpace,
  NodeContainer,
  NodeHeader
} from "../components";
import DropTarget from "../dndTree/DropTarget";

const TextNode = React.forwardRef(
  (
    {
      text,
      style,
      children,
      highlightPlacement,
      relativeShift,
      connectDragSource,
      connectDropTarget,
      isDragging
    },
    ref
  ) => {
    const elementRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    return (
      <NodeContainer style={style}>
        {connectDropTarget(
          <div ref={elementRef}>
            <NodeHeader>
              {highlightPlacement && (
                <Highlighted
                  highlightPlacement={highlightPlacement}
                  relativeShift={relativeShift}
                />
              )}
              {connectDragSource(
                <div>
                  <Bullet isDragging={isDragging} />
                </div>
              )}
              <span>{text}</span>
            </NodeHeader>
          </div>
        )}
        {children && (
          <ChildrenSpace>
            {children}
            <AddNewNodeItem />
          </ChildrenSpace>
        )}
      </NodeContainer>
    );
  }
);

TextNode.displayName = "TextNode";

export default DropTarget(DragSource(TextNode));
