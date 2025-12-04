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
  MarkerType,
  Panel,
  Node,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./Workflow.constants";
import { useCallback, useRef } from "react";
import StartNode from "./nodeTypes/StartNode";
import CustomEdge from "./CustomEdge";
import { COMPONENTS, WorkflowComponentType } from "./panel/WorkflowComponents";
import { Button } from "../ui/button";
import WorkflowPanel from "./panel/WorkflowPanel";
import useWorkflowDnd from "./hooks/useWorkflowDnd";

const nodeTypes = {
  startNode: StartNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { onDragStart, onDragOver, onDrop } = useWorkflowDnd();

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        ...connection,
        animated: true,
        id: crypto.randomUUID(),
        type: "customEdge",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
          color: "#000000",
        },
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [setEdges]
  );

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    if (source === target) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="h-[90%] w-[90%] border border-dotted border-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        isValidConnection={isValidConnection}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode="dark"
      >
        <Panel
          position="top-right"
          className="border border-gray-300 p-3 rounded-xl bg-white 
          w-[200px]"
        >
          {/* PANEL  */}
          <WorkflowPanel onDragStart={onDragStart} />
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default Workflow;
