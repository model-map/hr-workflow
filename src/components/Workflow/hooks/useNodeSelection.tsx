import { Node } from "@xyflow/react";
import { useState } from "react";

const useNodeSelection = () => {
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
    setSelectedNode(node);
  };
  const onPaneClick = () => {
    setSelectedNode(undefined);
  };

  return { selectedNode, setSelectedNode, onNodeClick, onPaneClick };
};
export default useNodeSelection;
