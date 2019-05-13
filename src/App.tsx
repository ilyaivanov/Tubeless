import React, { useState } from "react";
import Tree from "./tree/Tree";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Placement, Node } from "./tree/types";
import { removeNode, updateNode } from "./domain/dropRules";
import { drop } from "./domain/dropRules";
import { shallowEqual } from "./domain/shallowCompare";
import Player from "./player";

const App: React.FC = () => {
  const [tree, setTree] = useState(sampleNodes);

  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const [nodeBeingPlayed, setNodeBeingPlayer] = useState({} as Node);

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

  const onDelete = (node: Node) =>
    setTree(removeNode(tree, node.id));

  const onPlay = (node: Node) => setNodeBeingPlayer(node);

  return (
    <div>
      <DragContext>
        <Tree
          tree={tree}
          ids={tree.roots}
          level={0}
          onToggleCollapse={onToggleCollapse}
          setPlacement={updatePlacementOptimized}
          onDrop={onDrop}
          onPlay={onPlay}
          onDelete={onDelete}
          placement={placement}
        />
      </DragContext>
      <Player videoId={nodeBeingPlayed.videoUrl} />
    </div>
  );
};

export default App;
