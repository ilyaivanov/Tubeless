import React, {useState} from "react";
import Tree from "./tree/Tree";
import { DragContext } from "./tree/dnd";
import {twoNestedNodes} from "./tree/sampleTrees";
import {Placement} from "./tree/types";
import {updateNode} from "./domain/dropRules";
import {drop} from "./domain/dropRules";

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

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) setPlacement(newPlacement);
  };

  const onDrop = () => {
    setTree(drop(tree, placement as Placement));
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
          setPlacement={updatePlacementOptimized}
          onDrop={onDrop}
          placement={placement}
        />
      </DragContext>
    </div>
  );
};

export default App;
