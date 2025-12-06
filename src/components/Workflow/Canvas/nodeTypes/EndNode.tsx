"use client";

import { Card } from "@/components/shadcn_ui/card";
import { Label } from "@/components/shadcn_ui/label";
import { Node, Position, useReactFlow } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNodeButton from "../DeleteNodeButton";
import { useEffect } from "react";
import EndNodeForm from "../../forms/EndNodeForm";
// import StartNodeForm from "../forms/StartNodeForm";

const EndNode = (node: Node) => {
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (!node.data?.message || node.data?.summary === undefined) {
      updateNodeData(node.id, {
        message: "Simulation Pending",
        summary: true,
      });
    }
  }, [node.id, node.data, updateNodeData]);

  return (
    <div>
      <Card className="mt-2 py-4 px-8 ">
        <div className="flex items-center justify-between gap-4">
          <Label>End Node</Label>
          <DeleteNodeButton id={node.id} />
        </div>
        <EndNodeForm key={node.id} node={node} />
      </Card>
      <CustomHandle type="target" position={Position.Top} connectionCount={1} />
    </div>
  );
};
export default EndNode;
