import { Node, useNodesData, useStore } from "@xyflow/react";
import { REQUIRED_PATH } from "../utils/WorkflowNodeRegistry";
import { useEffect, useState } from "react";

type WorkflowDataType = {
  type: string;
  node?: Node;
};

const useWorkflowData = () => {
  const nodes = useStore((state) => state.nodes);
  const [workflowData, setWorkflowData] = useState<WorkflowDataType[]>([]);

  useEffect(() => {
    const wflowArr: WorkflowDataType[] = [];
    for (let i = 0; i < REQUIRED_PATH.length; i++) {
      const node = nodes.find((n) => n.type === REQUIRED_PATH[i]) ?? undefined;
      wflowArr.push({
        type: REQUIRED_PATH[i],
        node: node,
      });
    }
    setWorkflowData(wflowArr);
  }, [nodes]);

  return { workflowData };
};
export default useWorkflowData;
