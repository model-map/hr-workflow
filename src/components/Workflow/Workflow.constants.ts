import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Node 1",
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "2",
    data: {
      label: "Node 2",
    },
    position: {
      x: 200,
      y: 200,
    },
  },
  {
    id: "3",
    data: {
      label: "Node 3",
    },
    position: {
      x: 0,
      y: 200,
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
  },
];
