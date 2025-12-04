import { useReactFlow } from "@xyflow/react";
import { Button } from "../shadcn_ui/button";
import { Trash2 } from "lucide-react";

const DeleteNode = ({ id }: { id: string }) => {
  const { setNodes } = useReactFlow();

  const handleNode = () =>
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));

  return (
    <Button
      size="icon"
      variant="outline"
      className="ml-auto"
      onClick={handleNode}
    >
      <Trash2 />
    </Button>
  );
};
export default DeleteNode;
