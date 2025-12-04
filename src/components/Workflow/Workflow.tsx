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

const nodeTypes = {
  startNode: StartNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

let id = 10;
const getId = () => `dndnode_${id++}`;

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const dragOutsideRef = useRef<WorkflowComponentType | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: WorkflowComponentType
  ) => {
    dragOutsideRef.current = nodeType;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = dragOutsideRef.current;
    if (!type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: getId(),
      type,
      position,
    };

    setNodes((nodes) => nodes.concat(newNode));
  };

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
      >
        <Panel
          position="top-right"
          className="border border-gray-300 p-3 rounded-xl bg-white 
          w-[200px]"
        >
          {/* PANEL  */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="text-xs">Components</h1>
              <div className="mt-1 gap-1 flex flex-col ">
                {COMPONENTS.map((component) => {
                  return (
                    <Button
                      variant="outline"
                      key={component.type}
                      draggable
                      aria-label={component.label}
                      onDragStart={(event) =>
                        onDragStart(event, component.type)
                      }
                      className="w-full"
                      asChild
                    >
                      <div className="flex">
                        {component.icon}
                        {component.label}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default Workflow;
