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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./Workflow.constants";
import { useCallback } from "react";
import StartNode from "./nodeTypes/StartNode";
import CustomEdge from "./CustomEdge";

import WorkflowPanel from "./panel/WorkflowPanel";
import useWorkflowDnd from "./hooks/useWorkflowDnd";
import TaskNode from "./nodeTypes/TaskNode";
import ApprovalNode from "./nodeTypes/ApprovalNode";
import AutomatedNode from "./nodeTypes/AutomatedNode";
import EndNode from "./nodeTypes/EndNode";
import useWorkflowClick from "./hooks/useWorkflowClick";
import StartNodeForm from "./forms/StartNodeForm";
import TaskNodeForm from "./forms/TaskNodeForm";

const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { onDragStart, onDragOver, onDrop } = useWorkflowDnd();
  const { selectedNode, onNodeClick, onPaneClick } = useWorkflowClick();

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

  const formMap: Record<string, (node: Node) => JSX.Element> = {
    startNode: (node) => <StartNodeForm node={node} />,
    taskNode: (node) => <TaskNodeForm node={node} />,
  };

  return (
    <div className="h-[90%] w-[90%] border border-dotted border-black">
      {selectedNode && (
        <div
          className="absolute w-[250px]
      flex items-center bg-secondary z-10
      rounded
      "
        >
          <div className="z-20 p-4">
            {selectedNode.type === "startNode" && (
              <StartNodeForm key={selectedNode.id} node={selectedNode} />
            )}
            {selectedNode.type === "taskNode" && (
              <TaskNodeForm key={selectedNode.id} node={selectedNode} />
            )}
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        isValidConnection={isValidConnection}
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode="dark"
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
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
