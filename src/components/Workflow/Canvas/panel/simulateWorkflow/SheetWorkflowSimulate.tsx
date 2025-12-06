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
import { Textarea } from "@/components/shadcn_ui/textarea";
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

async function simulateDelay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function SheetWorkflowSimulate() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1); //idle at mount
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");

  const { isValidWorkflow } = useWorkflowValidation();
  const { workflowData } = useWorkflowData();

  const runSimulation = async () => {
    try {
      setError(null);
      setLoading(true);
      //   "Serialising your data",
      await simulateDelay(300);
      setStep(0);
      const payload = JSON.stringify(workflowData);

      //   "Sending data to API",
      await simulateDelay(1800);
      setStep(1);
      const res = await fetch("/api/simulate", {
        method: "POST",
        body: payload,
      });

      // "Waiting for response"
      await simulateDelay(1800);
      setStep(2);
      const data = await res.json();

      // "Response received"
      await simulateDelay(1800);
      setStep(3);
      console.log(data);

      // "Summary"
      await simulateDelay(1800);
      setSummary("YOUR SUMMARY HERE");
      setStep(4);

      await simulateDelay(1800);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
        // setStep(4);
      }
    }
  };

  const onRerunSimulation = () => {
    setStep(-1);
    setError(null);
    setLoading(false);
    setSummary("");
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

        <div className="mx-10 pt-10 flex flex-col gap-10 items-center justify-center">
          {steps.slice(0, step + 1).map((label, i) => (
            <Label key={i}>{label}</Label>
          ))}
          {typeof summary === "string" && summary.trim().length > 0 && (
            <Textarea className="text-center pt-4" disabled value={summary}>
              {summary}
            </Textarea>
          )}
          {error && <Label className="text-red-500">Error: {error}</Label>}
        </div>

        <SheetFooter>
          <Button
            variant="default"
            onClick={onRerunSimulation}
            disabled={loading}
          >
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
