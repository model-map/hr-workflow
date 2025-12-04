"use client";

import { Edge, Node } from "@xyflow/react";

export const initialEdges: Edge[] = [
  // {
  //   id: "2-3",
  //   source: "2",
  //   target: "3",
  //   animated: true,
  // },
];

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
  // {
  //   id: "2",
  //   data: {
  //     label: "Node 2",
  //   },
  //   position: { x: 400, y: 600 },
  // },
  // {
  //   id: "3",
  //   data: {
  //     label: "Node 3",
  //   },
  //   position: { x: 400, y: 800 },
  // },
];
