"use client";

import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./Workflow.constants";
import { useCallback } from "react";
import StartNode from "./CustomNodes/StartNode";
import CustomEdge from "./CustomEdge";

const nodeTypes = {
  startNode: StartNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        ...connection,
        animated: true,
        id: crypto.randomUUID(),
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [setEdges]
  );

  return (
    <div className="h-3/4 w-3/4 border border-dotted border-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default Workflow;
