import styled from "styled-components";
import { NodeType } from "../types";

interface Props {
  type: NodeType;
}

export const VideoPreview = styled.img<Props>`
  height: 32px;
  width: 32px;

  ${(props: Props) => (props.type === "Channel" ? "border-radius: 50px;" : "")}
  margin-right: 5px;
`;
