import { useStore } from "@xyflow/react";
import { useMemo } from "react";
import { validateWorkflowGraph } from "../utils/validateWorkflowGraph";

// IDEA HERE IS TO MAKE SURE THAT THE WORKFLOW FOLLOWS THIS PATH
// startNode -> taskNode -> approvalNode -> automatedNode -> endNode

const useWorkflowValidation = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const isValidWorkflow = useMemo(() => {
    return validateWorkflowGraph(nodes, edges);
  }, [nodes, edges]);

  // THIS WILL BE USED BY endNode to create summaries
  return { isValidWorkflow };
};
export default useWorkflowValidation;
