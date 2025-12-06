import { Button } from "@/components/shadcn_ui/button";
import { Label } from "@/components/shadcn_ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn_ui/sheet";
import useWorkflowData from "@/components/workflow/hooks/useWorkflowData";
import useWorkflowValidation from "@/components/workflow/hooks/useWorkflowValidation";
import { useState } from "react";

const steps = [
  "Serialising your data",
  "Sending data to API",
  "Waiting for response",
  "Response received",
  "Summary",
];

export function SheetWorkflowSimulate() {
  const [step, setStep] = useState(-1); //idle at mount
  const [error, setError] = useState<string | null>(null);

  const { isValidWorkflow } = useWorkflowValidation();
  const { workflowData } = useWorkflowData();

  const runSimulation = async () => {
    try {
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 300));
      setStep(0);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const payload = JSON.stringify(workflowData);

      setStep(1);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // const res = await fetch("/api/simulate", {
      //   method: "POST",
      //   body: payload,
      // });

      setStep(2);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // const data = await res.json();

      setStep(3);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log(data);
      setStep(4);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        // setStep(4);
      }
    }
  };

  const onRerunSimulation = () => {
    setStep(-1);
    setError(null);
    runSimulation();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="destructive"
          className="w-full"
          onClick={runSimulation}
        >
          Simulate Workflow
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Simulating Workflow</SheetTitle>
          <SheetDescription>Using your workflow graph</SheetDescription>
        </SheetHeader>

        <div className="pt-10 flex flex-col gap-10 items-center justify-center">
          {steps.slice(0, step + 1).map((label, i) => (
            <Label key={i}>{label}</Label>
          ))}

          {error && <Label className="text-red-500">Error: {error}</Label>}
        </div>

        <SheetFooter>
          <Button variant="default" onClick={onRerunSimulation}>
            Re-run Simulation
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
