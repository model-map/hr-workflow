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
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./utils/Workflow.constants";
import { useCallback } from "react";
import CustomEdge from "./Canvas/CustomEdge";

import WorkflowPanel from "./Canvas/panel/WorkflowPanel";
import useWorkflowDnd from "./hooks/useNodeDragAndDrop";
import StartNode from "./Canvas/nodeTypes/StartNode";
import TaskNode from "./Canvas/nodeTypes/TaskNode";
import ApprovalNode from "./Canvas/nodeTypes/ApprovalNode";
import AutomatedNode from "./Canvas/nodeTypes/AutomatedNode";
import EndNode from "./Canvas/nodeTypes/EndNode";
import useWorkflowClick from "./hooks/useNodeSelection";
import StartNodeForm from "./forms/StartNodeForm";
import TaskNodeForm from "./forms/TaskNodeForm";
import ApprovalNodeForm from "./forms/ApprovalNodeForm";
import AutomationNodeForm from "./forms/AutomationNodeForm";
import EndNodeForm from "./forms/EndNodeForm";
import { EndNodeProvider } from "./hooks/EndNodeProvider";

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

  return (
    <EndNodeProvider>
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
              {selectedNode.type === "approvalNode" && (
                <ApprovalNodeForm key={selectedNode.id} node={selectedNode} />
              )}
              {selectedNode.type === "automatedNode" && (
                <AutomationNodeForm key={selectedNode.id} node={selectedNode} />
              )}
              {/* {selectedNode.type === "endNode" && (
                <EndNodeForm key={selectedNode.id} node={selectedNode} />
              )} */}
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
          // fitView
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
          <MiniMap />
        </ReactFlow>
      </div>
    </EndNodeProvider>
  );
};
export default Workflow;
