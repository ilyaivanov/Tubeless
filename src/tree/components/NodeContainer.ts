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
  height: 24px;
  padding-left: ${(props: NodeContainerProps) => props.level * LEVEL_SHIFT}px;
`;
