import { Node, Nodes } from "./types";
import React, { KeyboardEvent, useState, Fragment } from "react";
import { NodeIcons, NodeText } from "./components";
import {onDeleteNode, onRenameNode} from "./treeActions";

interface Props {
  node: Node;
  nodes: Nodes;
  setNodes: (nodes: Nodes) => void;
}

const NodeTitle = ({ nodes, node, setNodes }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();

  const onEdit = () => {
    setText(node.text);
    setIsEditing(true);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      endEdit();
    }
  };

  const endEdit = () => {
    setNodes(onRenameNode(nodes, node.id, text));
    setIsEditing(false);
  };

  const onDelete = (nodeId: string) =>
    setNodes(onDeleteNode(nodes, nodeId));

  return (
    <Fragment>
      {isEditing ? (
        <input
          data-testid={"input-" + node.id}
          onBlur={endEdit}
          autoFocus
          onKeyPress={onKey}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      ) : (
        <Fragment>
          <NodeText data-testid={"title-" + node.id}>{node.text}</NodeText>
          {node.isLoading && (
            <span data-testid={"loading-" + node.id}>Loading...</span>
          )}
        </Fragment>
      )}
      <NodeIcons
        nodeId={node.id}
        onEdit={onEdit}
        onDelete={() => onDelete(node.id)}
      />
    </Fragment>
  );
};

export default NodeTitle;
