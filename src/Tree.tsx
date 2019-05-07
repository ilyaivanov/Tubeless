import React, { Fragment, useState } from "react";
import { canDragOver, convertPlacement, areEqualShallow } from "./rules/rules";
import Node from "./nodes/TextNode";
import DragDropContext from "./dndTree/DragDropContext";
import { NodeType, Placement, Tree } from "./types";

export default ({ tree, onDropAction }: { tree: Tree, onDropAction: any }) => {
  const [placement, setPlacement] = useState({
    id: ""
  });

  const onDrop = () => {
    onDropAction(placement);
    setPlacement({
      id: ""
    });
  }

  const updatePlacement = (newPlacement: Placement) => {
    if (canDragOver(tree.nodes, newPlacement)) {
      const converted = convertPlacement(tree.nodes, newPlacement);
      if (!areEqualShallow(converted, placement)) {
        setPlacement(converted);
      }
    }
  };

  return (
    <div>
      <DragDropContext>
        <TreeUI
          tree={tree.nodes}
          nodes={tree.roots}
          placement={placement}
          setPlacement={updatePlacement}
          onDrop={onDrop}
        />
      </DragDropContext>
    </div>
  );
};

const TreeUI = ({ tree, nodes, placement, level = 1, setPlacement, onDrop }: any) => {
  return (
    <Fragment>
      {nodes.map((id: string) => (
        // @ts-ignore
        <Node
          id={id}
          key={id}
          text={tree[id].text}
          level={level}
          setPlacement={setPlacement}
          onDrop={onDrop}
          {...getPlacementProps(tree[id], placement)}
        >
          {tree[id].children && tree[id].children.length > 0 && (
            <TreeUI
              tree={tree}
              nodes={tree[id].children}
              placement={placement}
              level={level + 1}
              setPlacement={setPlacement}
              onDrop={onDrop}
            />
          )}
        </Node>
      ))}
    </Fragment>
  );
};

const getPlacementProps = (node: NodeType, placement: Placement) => {
  if (node.id !== placement.id) return undefined;
  return placement;
};
