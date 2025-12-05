"use client";

import { Node, useReactFlow } from "@xyflow/react";
import { useCallback, useRef } from "react";
import { WorkflowComponentType } from "../utils/WorkflowNodeRegistry";
import { toast } from "sonner";

const useWorkflowDnd = () => {
  const dragOutsideRef = useRef<WorkflowComponentType | null>(null);
  const { getNodes, setNodes, screenToFlowPosition } = useReactFlow();

  const nodeTypes = getNodes().map((node) => node.type);

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: WorkflowComponentType
  ) => {
    if (nodeTypes.includes(nodeType)) {
      return;
    }
    dragOutsideRef.current = nodeType;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = dragOutsideRef.current;
    if (!type) {
      return;
    }

    if (nodeTypes.includes(type)) {
      toast.info("Parallel Approvals coming soon", {
        description: "Please make do with a single workflow till then :)",
      });

      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: crypto.randomUUID(),
      type,
      position,
      data: {},
    };

    setNodes((nodes) => nodes.concat(newNode));
  };

  return { onDragStart, onDrop, onDragOver };
};

export default useWorkflowDnd;
