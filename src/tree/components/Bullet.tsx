import styled from "styled-components";
import React, { Ref } from "react";
import { Node } from "../types";
import FolderClosedNonEmpty from "./icons/folder-closed-withItems.svg";
import FolderClosedLoader from "./icons/folder-closed-loader.svg";
import FolderClosedEmpty from "./icons/folder-closed-empty.svg";
import FolderOpenedMany from "./icons/folder-opened-many.svg";
import FolderOpenedSingle from "./icons/folder-opened-single.svg";
import FolderOpenedEmpty from "./icons/folder-opened-empty.svg";
import { NodeContainer } from "./NodeContainer";

interface BulletProps {
  node: Node;
}

const FOLDER_SIZE = 25;

export const Bullet = React.forwardRef(
  ({ node }: BulletProps, ref: Ref<HTMLDivElement>) => (
    <CircleContainer ref={ref} data-testid={"drag-handle-" + node.id}>
      <Img
        src={getFolderIcon(node)}
        alt=""
        width={FOLDER_SIZE}
        height={FOLDER_SIZE}
      />
    </CircleContainer>
  )
);

const getFolderIcon = (node: Node) => {
  if (node.isHidden) {
    if (node.children && node.children.length > 0) return FolderClosedNonEmpty;
    if (node.loader) return FolderClosedLoader;
    return FolderClosedEmpty;
  }
  const children = node.children;

  if (!children) return FolderOpenedEmpty;

  if (children.length > 1) return FolderOpenedMany;
  else return FolderOpenedSingle;
};

const Img = styled.img`
  filter: invert(0.3);
  ${NodeContainer}:hover & {
    filter: invert(0);
  }
`;

export const CircleContainer = styled.div`
  margin-right: 5px;
`;
