import Workflow from "@/components/workflow/Workflow";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <ReactFlowProvider>
        <Workflow />
      </ReactFlowProvider>
    </div>
  );
}
