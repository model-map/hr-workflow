import { useReactFlow } from "@xyflow/react";
import { Button } from "../../shadcn_ui/button";
import { Trash2 } from "lucide-react";
import useWorkflowClick from "../hooks/useNodeSelection";

const DeleteNodeButton = ({ id }: { id: string }) => {
  const { setNodes } = useReactFlow();
  const { setSelectedNode } = useWorkflowClick();

  const handleNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setSelectedNode(undefined);
  };

  return (
    <Button size="icon" variant="outline" onClick={handleNode}>
      <Trash2 />
    </Button>
  );
};
export default DeleteNodeButton;
