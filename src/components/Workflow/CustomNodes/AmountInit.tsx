"use client";

import { Node, NodeProps } from "@xyflow/react";

const AmountInit = ({ data }: NodeProps<Node<{ amount: number }>>) => {
  if (!data) {
    return null;
  }
  const { amount } = data;
  return (
    <div className="text-updater-node">
      <div>
        <p>Custom Node: {amount}</p>
      </div>
    </div>
  );
};
export default AmountInit;
