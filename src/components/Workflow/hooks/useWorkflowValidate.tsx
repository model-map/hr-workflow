import { useReactFlow, useStore } from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";
import { COMPONENTS_LENGTH } from "../utils/WorkflowNodeRegistry";
import { workflowValidator } from "../utils/workflowValidator";

// IDEA HERE IS TO MAKE SURE THAT THE WORKFLOW FOLLOWS THIS PATH
// startNode -> taskNode -> approvalNode -> automatedNode -> endNode

const useWorkflowValidate = () => {
  const message = `Invalid Workflow. Please make sure the workflow follows this path:
    startNode -> taskNode -> approvalNode -> automatedNode -> endNode`;

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const isValidWorkflow = useMemo(() => {
    return workflowValidator(nodes, edges);
  }, [nodes, edges]);

  return { isValidWorkflow };
};
export default useWorkflowValidate;
