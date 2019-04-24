import React, {Fragment} from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Context = ({children}: any) => <Fragment>
  {children}
</Fragment>;

export default DragDropContext(HTML5Backend)(Context);
