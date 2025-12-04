"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";
import DeleteNode from "../DeleteNode";

const EndNode = ({ id }: NodeProps) => {
  return (
    <div>
      <Label> End Node</Label>

      <Card className="mt-2 py-8 px-4">
        {/*  EndNodeForm /> */}
        <DeleteNode id={id} />
      </Card>
      <CustomHandle type="source" position={Position.Bottom} />
      <CustomHandle type="source" position={Position.Top} />
    </div>
  );
};
export default EndNode;
