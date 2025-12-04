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
      <Card className="mt-2 py-4 px-16">
        <Label>Task Node</Label>
        {/* <TaskNodeForm /> */}
        {/* <DeleteNode id={id} /> */}
      </Card>
      <CustomHandle type="target" position={Position.Top} />
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
};
export default TaskNode;
