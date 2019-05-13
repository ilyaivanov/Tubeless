import React from "react";
import styled from "styled-components";
import { NodeContainer } from "./NodeContainer";

interface Props {
  nodeId: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NodeIcons = ({ onEdit, onDelete, nodeId }: Props) => (
  <IconsContainer>
    <button onClick={onEdit}>E</button>
    <button data-testid={"delete-" + nodeId} onClick={onDelete}>
      X
    </button>
  </IconsContainer>
);

const IconsContainer = styled.div`
  visibility: hidden;
  ${NodeContainer}:hover & {
    visibility: visible;
  }
  padding-left: 10px;
`;

export { NodeIcons };
