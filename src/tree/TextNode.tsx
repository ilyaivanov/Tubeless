import React, {Fragment, useState} from "react";
import {twoNestedNodes} from "./sampleTrees";
import {Node, Nodes, TreeInfo} from "./types";
import {Arrow, Circle, CircleContainer, NodeContainer, Text} from "./components";

export const Tree = () => {
  const [tree, setTree] = useState(twoNestedNodes);

  const onToggleCollapse = (id: string) => {
    const newTree: TreeInfo = {
      ...tree,
      nodes: {
        ...tree.nodes,
        [id]: {
          ...tree.nodes[id],
          isHidden: !tree.nodes[id].isHidden,
        }
      }
    };
    setTree(newTree)
  };

  return (
    <div style={{padding: 20}}>
      <TreeImp nodes={tree.nodes} ids={tree.roots} level={0} onToggleCollapse={onToggleCollapse}/>
    </div>
  );
};

const TreeImp = ({nodes, ids, level, onToggleCollapse}: { nodes: Nodes; ids: string[], level: number, onToggleCollapse: any }) => {
  const renderChildren = (id: string) => {
    const {children} = nodes[id];
    if (children && !nodes[id].isHidden) return <TreeImp nodes={nodes} ids={children} onToggleCollapse={onToggleCollapse} level={level + 1}/>;
  };
  return (
    <Fragment>
      {ids.map(id => (
        <NodeElement onToggleCollapse={onToggleCollapse} node={nodes[id]}
                     level={level}>{renderChildren(id)}</NodeElement>
      ))}
    </Fragment>
  );
};

export const NodeElement = ({children, node, level, onToggleCollapse}: { children: any, level: number, node: Node, onToggleCollapse: any }) => (
  <div>
    <NodeContainer data-testid="node" level={level}>
      <Arrow orientation={node.isHidden ? 'down' : 'right'} data-testid="arrow" onClick={() => onToggleCollapse(node.id)}/>
      <Bullet/>

      <Text>{node.text}</Text>
    </NodeContainer>
    {children}
  </div>
);

export const Bullet = ({onClick}: any) => (
  <CircleContainer onClick={onClick}>
    <Circle
      width={18}
      color="rgb(220, 224, 226)"
      hoverColor={"rgb(183, 188, 191)"}
    >
      <Circle width={8} color="rgb(75, 81, 85)"/>
    </Circle>
  </CircleContainer>
);
