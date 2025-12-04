"use client";

import { Card } from "@/components/shadcn_ui/card";
import { Label } from "@/components/shadcn_ui/label";
import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNode from "../DeleteNode";
import StartNodeForm from "../forms/StartNodeForm";

const StartNode = ({ id }: NodeProps) => {
  return (
    <div>
      <Label>Start Node</Label>
      <Card className="mt-2 py-8 px-4">
        <StartNodeForm />
        <DeleteNode id={id} />
      </Card>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
};
export default StartNode;
