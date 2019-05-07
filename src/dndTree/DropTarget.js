import { DropTarget } from "react-dnd";
import { bulletMargin, itemMargin } from "../constants";

export const getVerticalPlacement = (rect, yPosition) => {
  const middlePoint = (rect.bottom + rect.top) / 2;
  if (middlePoint >= yPosition) return "PLACE_BEFORE";
  else return "PLACE_AFTER";
};

export default DropTarget(
  "CARD",
  {
    drop(props) {
      props.onDrop();
    },
    hover(props, monitor, component) {
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
      const divider = itemMargin + bulletMargin;
      let placementLevel = Math.floor((itemMargin + diff) / divider);
      props.setPlacement({
        itemBeingDragged: monitor.getItem().id,
        id: props.id,
        highlightPlacement: placement,
        relativeShift: placementLevel - props.level
      });
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
);
