export const validateParent = (
  parentId: string | undefined,
  nodeId: string
): string => {
  if (!parentId)
    throw new Error(
      "Expected parent for node " + nodeId + ", but not " + parentId
    );
  return parentId;
};
