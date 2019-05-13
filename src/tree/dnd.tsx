import React, { Fragment } from "react";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Placement, PlacementOrientation } from "./types";
import { getBoundingClientRect, getClientOffset } from "./offsetHandler";
import { ARROW_SIZE } from "./components";
import { NodeProps } from "./Node";
import { getParentKey } from "../domain/dropRules";

const Context = ({ children }: { children: JSX.Element }) => (
  <Fragment>{children}</Fragment>
);

export const DragContext = DragDropContext(HTML5Backend)(Context);

export const TreeDragSource = DragSource(
  "NODE",
  {
    beginDrag: (props: NodeProps) => {
      return {
        id: props.node.id
      };
    },
    endDrag: (props: NodeProps, monitor: any) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        props.setPlacement({
          id: ""
        });
      }
    }
  },
  connect => ({
    connectDragSource: connect.dragSource()
  })
);

function getVerticalPlacement(
  rect: DOMRectReadOnly,
  yPosition: number
): PlacementOrientation {
  const middlePoint = (rect.bottom + rect.top) / 2;
  return middlePoint >= yPosition ? "BEFORE" : "AFTER";
}

export const TreeDropTarget = DropTarget(
  "NODE",
  {
    drop(props: NodeProps) {
      props.onDrop();
    },
    hover(props: NodeProps, monitor: any, component: any) {
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

      const offsetWithoutArrow = Math.max(
        clientOffset.x - ARROW_SIZE - hoverBoundingRect.x,
        0
      );

      const dragLevel = Math.floor(offsetWithoutArrow / 20);

      const parent = getParentKey(props.tree.nodes, props.node.id);

      const context = !parent
        ? props.tree.roots
        : (props.tree.nodes[parent].children as string[]);
      const isFirst = context.indexOf(props.node.id) === 0;

      const maxDragLevel =
        placement === "BEFORE" && isFirst ? props.level : props.level + 1;

      const desiredDragLevel =
        dragLevel > maxDragLevel ? maxDragLevel : dragLevel;

      const desiredPlacement: Placement = {
        itemBeingDragged: monitor.getItem().id,
        id: props.node.id,
        orientation: placement,
        dragLevel: desiredDragLevel
      };
      props.setPlacement(desiredPlacement);
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
);
