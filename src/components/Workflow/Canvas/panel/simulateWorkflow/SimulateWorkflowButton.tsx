import { Button } from "@/components/shadcn_ui/button";
import { useStore } from "@xyflow/react";

const SimulateWorkflowButton = () => {
  const nodes = useStore((state) => state.nodes);

  return (
    <Button className="w-full" variant="destructive">
      Simulate Workflow
    </Button>
  );
};
export default SimulateWorkflowButton;
