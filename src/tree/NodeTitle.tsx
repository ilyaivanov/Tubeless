import { Node } from "./types";
import React, { KeyboardEvent, useState, Fragment } from "react";
import { NodeIcons, NodeText } from "./components";

interface Props {
  node: Node;
  onUpdate: (node: Partial<Node>) => void;
  onDelete: (node: Node) => void;
}

const NodeTitle = ({ onDelete, onUpdate, node }: Props) => {
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
    onUpdate({
      id: node.id,
      text: text
    });
    setIsEditing(false);
  };

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
        <NodeText data-testid={"title-" + node.id}>{node.text}</NodeText>
      )}
      <NodeIcons
        nodeId={node.id}
        onEdit={onEdit}
        onDelete={() => onDelete(node)}
      />
    </Fragment>
  );
};

export default NodeTitle;