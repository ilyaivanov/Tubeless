import React, {useState} from "react";
import Tree from "./tree/Tree";
import { DragContext } from "./tree/dnd";
import {twoNestedNodes} from "./tree/sampleTrees";
import {Placement} from "./tree/types";
import {updateNode} from "./tree/treeUtils";

const App: React.FC = () => {
  const [tree, setTree] = useState(twoNestedNodes);

  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const onToggleCollapse = (id: string) => {
    setTree(
      updateNode(tree, id, node => ({
        isHidden: !node.isHidden
      }))
    );
  };

  const onDrop = () => {
    setPlacement({});
  };
  return (
    <div>
      <DragContext>
        <Tree
          nodes={tree.nodes}
          ids={tree.roots}
          level={0}
          onToggleCollapse={onToggleCollapse}
          setPlacement={setPlacement}
          onDrop={onDrop}
          placement={placement}
        />
      </DragContext>
    </div>
  );
};

export default App;
