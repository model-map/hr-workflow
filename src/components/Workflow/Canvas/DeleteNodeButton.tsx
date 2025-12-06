import { useReactFlow } from "@xyflow/react";
import { Button } from "../../shadcn_ui/button";
import { Trash2 } from "lucide-react";
import useWorkflowClick from "../hooks/useNodeSelection";

const DeleteNodeButton = ({ id }: { id: string }) => {
  const { setNodes, setEdges } = useReactFlow();
  const { setSelectedNode } = useWorkflowClick();

  const handleNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
    setSelectedNode(undefined);
  };

  return (
    <Button size="icon" variant="outline" onClick={handleNode}>
      <Trash2 />
    </Button>
  );
};
export default DeleteNodeButton;
