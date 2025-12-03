"use client";

import { Edge, Node } from "@xyflow/react";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "startNode",
    position: {
      x: 100,
      y: 100,
    },
    data: {
      title: "Start Node Title Here",
    },
  },
];
