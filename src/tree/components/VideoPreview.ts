import styled from "styled-components";
import { NodeType } from "../types";

interface Props {
  type: NodeType;
}

export const VideoPreview = styled.img<Props>`
  height: 32px;
  width: 32px;

  max-width: 100%;

  border-radius: ${(props: Props) => hasRoundImage(props.type) ? 60 : 3}px;
  margin-right: 5px;
`;

const hasRoundImage = (nodeType: NodeType) =>
  nodeType === "Channel" || nodeType === "Playlist";
