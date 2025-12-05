"use client";

import { Card } from "@/components/shadcn_ui/card";
import { Label } from "@/components/shadcn_ui/label";
import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNodeButton from "../DeleteNodeButton";

const TaskNode = ({ id }: NodeProps) => {
  return (
    <div>
      <Card className="mt-2 py-4 px-16">
        <div className="flex items-center justify-between gap-4">
          <Label>Task Node</Label>
          <DeleteNodeButton id={id} />
        </div>
      </Card>
      <CustomHandle type="target" position={Position.Top} connectionCount={1} />
      <CustomHandle
        type="source"
        position={Position.Bottom}
        connectionCount={1}
      />
    </div>
  );
};
export default TaskNode;
