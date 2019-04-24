import React, { Fragment, useState } from "react";
import { storiesOf } from "@storybook/react";
import Node from "../tree/Node";
import DragDropContext from "../tree/DragDropContext";
import { canDragOver, convertPlacement, findRoots } from "../tree/rules";
import { createInitialNodes } from "../tree/nodes";

storiesOf("Dragging Tree", module).add("dragafter", () => <SampleTree />);

const SampleTree = () => {
  const [placement, setPlacement] = useState({
    id: ""
  });

  const updatePlacement = newPlacement => {
    console.log(newPlacement, canDragOver(nodes, newPlacement));
    if (canDragOver(nodes, newPlacement)) {
      setPlacement(convertPlacement(nodes, newPlacement));
    }
  };

  const nodes = createInitialNodes();

  return (
    <div>
      <DragDropContext>
        <Tree
          tree={createInitialNodes()}
          nodes={findRoots(nodes)}
          placement={placement}
          setPlacement={updatePlacement}
        />
      </DragDropContext>
    </div>
  );
};

const Tree = ({ tree, nodes, placement, level = 1, setPlacement }) => {
  return (
    <Fragment>
      {nodes.map(n => (
        <Node
          id={tree[n].id}
          setPlacement={setPlacement}
          key={tree[n].id}
          text={tree[n].text}
          {...getPlacementProps(tree[n], placement)}
          level={level}
        >
          {tree[n].children && (
            <Tree
              tree={tree}
              nodes={tree[n].children}
              placement={placement}
              level={level + 1}
              setPlacement={setPlacement}
            />
          )}
        </Node>
      ))}
    </Fragment>
  );
};

const getPlacementProps = (node, placement) => {
  if (node.id !== placement.id) return undefined;
  return placement;
};
