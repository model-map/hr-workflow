"use client";

import { Card } from "@/components/shadcn_ui/card";
import { Label } from "@/components/shadcn_ui/label";
import { Node, NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNode from "../DeleteNode";
// import StartNodeForm from "../forms/StartNodeForm";

const StartNode = ({ id }: NodeProps) => {
  return (
    <div>
      <Card className="mt-2 py-4 px-8 ">
        <div className="flex items-center justify-between gap-4">
          <Label>Start Node</Label>
          <DeleteNode id={id} />
        </div>
      </Card>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
};
export default StartNode;
