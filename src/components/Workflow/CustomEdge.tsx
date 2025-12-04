import { X } from "lucide-react";
import { Button } from "../shadcn_ui/button";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleEdge = () => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <Button
          asChild
          aria-label="Delete Edge"
          variant="ghost"
          size="icon"
          className="absolute text-red-500"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            background: "transparent",
          }}
          onClick={handleEdge}
        >
          <X />
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}
