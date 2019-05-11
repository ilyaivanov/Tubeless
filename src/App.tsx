import React from "react";
import Tree from "./tree/Tree";
import { DragContext } from "./tree/dnd";

const App: React.FC = () => {
  return (
    <div>
      <DragContext>
        <Tree />
      </DragContext>
    </div>
  );
};

export default App;
