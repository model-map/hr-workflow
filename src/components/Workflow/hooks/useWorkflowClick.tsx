import { Node } from "@xyflow/react";
import { useState } from "react";

const useWorkflowClick = () => {
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
    setSelectedNode(node);
  };
  const onPaneClick = () => {
    setSelectedNode(undefined);
  };

  return { selectedNode, onNodeClick, onPaneClick };
};
export default useWorkflowClick;
