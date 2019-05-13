import styled from "styled-components";
import { LEVEL_SHIFT } from "./constants";

interface NodeContainerProps {
  level: number;
}

export const NodeContainer = styled.div<NodeContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${(props: NodeContainerProps) => props.level * LEVEL_SHIFT}px;
`;
