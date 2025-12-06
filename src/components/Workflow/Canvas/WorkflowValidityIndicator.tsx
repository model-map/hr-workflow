import { Suspense } from "react";
import useWorkflowValidation from "../hooks/useWorkflowValidation";
import { Button } from "@/components/shadcn_ui/button";
import { Spinner } from "@/components/shadcn_ui/spinner";
import SimulateWorkflowButton from "./panel/simulateWorkflow/SimulateWorkflowButton";

export default function WorkflowValidityIndicator() {
  const { isValidWorkflow } = useWorkflowValidation();
  return (
    <Suspense fallback={<Spinner className="mx-auto" />}>
      {isValidWorkflow && <SimulateWorkflowButton />}
      {!isValidWorkflow && (
        <div className="space-y-2">
          <Button variant="default" className="w-full" disabled asChild>
            <p>Invalid Workflow</p>
          </Button>
          <p className="text-xs w-full text-red-500">
            (cannot run simulation without a valid workflow. Please follow the
            above linear pattern.)
          </p>
        </div>
      )}
    </Suspense>
  );
}
