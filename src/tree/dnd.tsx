import React, {Fragment} from "react";
import {DragDropContext, DragSource, DropTarget} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {Placement, PlacementOrientation} from "./types";

const Context = ({children}: any) => <Fragment>{children}</Fragment>;

export const DragContext = DragDropContext(HTML5Backend)(Context);


export const TreeDragSource = DragSource(
  "NODE",
  {
    beginDrag: (props: any) => {
      return {
        id: props.node.id
      }
    },
    endDrag: (props: any, monitor: any) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        props.setPlacement({
          id: ""
        });
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
);


export const getVerticalPlacement = (rect: any, yPosition: number): PlacementOrientation => {
  const middlePoint = (rect.bottom + rect.top) / 2;
  if (middlePoint >= yPosition) return "BEFORE";
  else return "AFTER";
};

export const TreeDropTarget = DropTarget(
  "NODE",
  {
    drop(props: any) {
      props.onDrop();
    },
    hover(props: any, monitor: any, component: any) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const placement = getVerticalPlacement(hoverBoundingRect, clientOffset.y);

      let differenceFromInitialOffset = monitor.getSourceClientOffset() || {
        x: 0
      };
      const diff = differenceFromInitialOffset.x;
      const divider = 20;
      // let placementLevel = Math.floor((itemMargin + diff) / divider);
      props.setPlacement({
        itemBeingDragged: monitor.getItem().id,
        id: props.node.id,
        orientation: placement,
        // relativeShift: placementLevel - props.level
      });
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
);
