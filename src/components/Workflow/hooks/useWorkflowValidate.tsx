import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { COMPONENTS_LENGTH } from "../utils/WorkflowNodeRegistry";

// IDEA HERE IS TO MAKE SURE THAT THE WORKFLOW FOLLOWS THIS PATH
// startNode -> taskNode -> approvalNode -> automatedNode -> endNode

const useWorkflowValidate = () => {
  const message = `Invalid Workflow. Please make sure the workflow follows this path:
    startNode -> taskNode -> approvalNode -> automatedNode -> endNode`;

  const [validationMessage, setValidationMessage] = useState(message);

  const [isValidWorkflow, setIsValidWorkflow] = useState(false);
  const { getNodes, getEdges } = useReactFlow();

  const nodes = getNodes();
  if (nodes.length == COMPONENTS_LENGTH) {
    // CHECK IF NODES FOLLOW THE PATH
  }

  console.log("in useWorkflowValidate.tsx");
  console.log("EDGES: ", getEdges());

  return { isValidWorkflow, validationMessage };
};
export default useWorkflowValidate;
