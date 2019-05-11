import React from "react";
import {Node} from "./types";
import {Arrow, Circle, CircleContainer, NodeContainer, Text} from "./components";

const NodeElement = ({children, node, level, onToggleCollapse}: { children: any, level: number, node: Node, onToggleCollapse: any }) => (
  <div>
    <NodeContainer data-testid="node" level={level}>
      <Arrow orientation={node.isHidden ? 'down' : 'right'} data-testid="arrow"
             onClick={() => onToggleCollapse(node.id)}/>
      <Bullet/>

      <Text>{node.text}</Text>
    </NodeContainer>
    {children}
  </div>
);

const Bullet = ({onClick}: any) => (
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

export default NodeElement;
