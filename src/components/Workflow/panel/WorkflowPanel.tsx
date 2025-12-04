import { Button } from "@/components/ui/button";
import { COMPONENTS, WorkflowComponentType } from "./WorkflowComponents";
import { useCallback, useRef } from "react";
import { useReactFlow } from "@xyflow/react";

let id = 10;
const getId = () => `dndnode_${id++}`;

const WorkflowPanel = () => {
  const dragOutsideRef = useRef<WorkflowComponentType | null>(null);
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: WorkflowComponentType
  ) => {
    dragOutsideRef.current = nodeType;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const type = dragOutsideRef.current;
    console.log("TYPE: ", type);
    if (!type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let node: Node | undefined;
  };

  return (
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
                onDragStart={(event) => onDragStart(event, component.type)}
                onDragOver={onDragOver}
                onDrop={onDrop}
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
  );
};
export default WorkflowPanel;
