"use client";

import { Card } from "@/components/shadcn_ui/card";
import { Label } from "@/components/shadcn_ui/label";
import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNode from "../DeleteNode";
import TaskNodeForm from "../forms/TaskNodeForm";

const TaskNode = ({ id }: NodeProps) => {
  return (
    <div>
      <Label>Task Node</Label>

      <Card className="mt-2 py-8 px-4">
        <TaskNodeForm />
        <DeleteNode id={id} />
      </Card>
      <CustomHandle type="source" position={Position.Bottom} />
      <CustomHandle type="source" position={Position.Top} />
    </div>
  );
};
export default TaskNode;
