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
  isHighlightedAfter,
  isHighlightedBefore,
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
            {(isHighlightedAfter || isHighlightedBefore) && (
              <Highlighted
                isHighlightedAfter={isHighlightedAfter}
                isHighlightedBefore={isHighlightedBefore}
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

export default DropTarget(DragSource(Node));
