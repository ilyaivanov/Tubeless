import { DragSource } from "react-dnd";

export default DragSource(
  "CARD",
  {
    beginDrag: props => ({
      id: props.id
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
);
