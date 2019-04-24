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
      props.setPlacement({
        id: ""
      });
    },
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
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
      let placementLevel = Math.floor(diff / itemMargin);

      if (
        props.placement != placement ||
        props.placementLevel != placementLevel
      ) {
        props.setPlacement({
          id: props.text,
          highlightPlacement: placement,
          highlightShift: placementLevel - props.level
        });
        console.log(
          differenceFromInitialOffset.x,
          placementLevel - props.level
        );
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
);
