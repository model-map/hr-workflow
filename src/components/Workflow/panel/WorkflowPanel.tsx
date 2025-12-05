import { Button } from "@/components/shadcn_ui/button";
import {
  COMPONENTS,
  WorkflowComponentType,
} from "../utils/WorkflowNodeRegistry";

const WorkflowPanel = ({
  onDragStart,
}: {
  onDragStart: (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: WorkflowComponentType
  ) => void;
}) => {
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
