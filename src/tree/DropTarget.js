import { DropTarget } from "react-dnd";
import { circleWidth, itemMargin } from "./constants";

export const getVerticalPlacement = (rect, yPosition) => {
  const middlePoint = (rect.bottom + rect.top) / 2;
  if (middlePoint >= yPosition) return "PLACE_BEFORE";
  else return "PLACE_AFTER";
};

export default DropTarget(
  "CARD",
  {
    drop(props, monitor) {
      // @ts-ignore
      // props.onDrop(monitor.getItem().id)
    },
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        // if (!node || !props.canMove(monitor.getItem().id, props.id)) {
        return null;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const placement = getVerticalPlacement(hoverBoundingRect, clientOffset.y);

      let differenceFromInitialOffset = monitor.getSourceClientOffset() || {
        x: 0
      };
      const diff = differenceFromInitialOffset.x;
      let placementLevel = Math.floor((diff - circleWidth / 2) / itemMargin);

      //thresholds are business logic
      const levelThreshsold =
        (props.placement == "PLACE_BEFORE" && props.isFirst) ||
        (props.placement == "PLACE_AFTER" && monitor.getItem().id == props.id)
          ? props.level
          : props.level + 1;

      if (placementLevel > levelThreshsold) {
        placementLevel = levelThreshsold;
      }

      if (
        props.placement != placement ||
        props.placementLevel != placementLevel
      ) {
        // props.updatePlacement(props.id, placement, placementLevel, placementLevel > props.level);
        console.log(
          props.text,
          placement,
          placementLevel,
          placementLevel > props.level
        );
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
);
