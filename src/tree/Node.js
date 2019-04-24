import React, {useImperativeHandle, useRef} from "react";
import DragSource from "./DragSource";
import {
  AddNewNodeItem,
  Bullet,
  Highlighted,
  ChildrenSpace,
  NodeContainer,
  NodeHeader
} from "./components/components";
import DropTarget from "./DropTarget";

const Node =  React.forwardRef(({
  text,
  style,
  children,
  highlightPlacement,
  highlightShift,
  connectDragSource,
  connectDropTarget
}, ref) => {
  const elementRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));

  return (
    <NodeContainer style={style}>
      {connectDropTarget(
        <div ref={elementRef}>
          <NodeHeader>
            {highlightPlacement && (
              <Highlighted
                highlightPlacement={highlightPlacement}
                highlightShift={highlightShift}
              />
            )}
            {connectDragSource(
              <div>
                <Bullet />
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
});

Node.displayName = 'Node';

export default DropTarget(DragSource(Node));
