import styled from "styled-components";
import { NodeType } from "../types";

interface Props {
  type: NodeType;
}

export const VideoPreview = styled.img<Props>`
  height: 32px;
  width: 32px;

  max-width: 100%;
  height: auto;

  border-radius: ${(props: Props) => (props.type === "Channel" ? 32 : 3)}px;
  margin-right: 5px;
`;
