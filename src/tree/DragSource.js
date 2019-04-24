import {DragSource, DragSourceConnector, DragSourceMonitor} from "react-dnd";

export default DragSource(
  'CARD',
  {
    beginDrag: (props: any) => ({
      id: props.id,
    }),
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),

  }),
)
