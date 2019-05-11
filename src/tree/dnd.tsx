import React, {Fragment} from "react";
import {DragDropContext, DragSource, DropTarget} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {PlacementOrientation} from "./types";
import {getBoundingClientRect, getClientOffset} from "./offsetHandler";

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
  (connect) => ({
    connectDragSource: connect.dragSource()
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

      const hoverBoundingRect = getBoundingClientRect(node);

      const clientOffset = getClientOffset(monitor);

      const placement = getVerticalPlacement(hoverBoundingRect, clientOffset.y);

      props.setPlacement({
        itemBeingDragged: monitor.getItem().id,
        id: props.node.id,
        orientation: placement,
      });
    }
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget()
  })
);
