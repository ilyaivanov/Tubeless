import { DragSource } from "react-dnd";

export default DragSource(
  "CARD",
  {
    beginDrag: props => ({
      id: props.id || props.text
    }),
    endDrag: (props, monitor) => {
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
