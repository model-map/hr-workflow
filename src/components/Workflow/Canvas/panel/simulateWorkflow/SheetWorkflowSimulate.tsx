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
import useEndNode from "@/components/workflow/hooks/EndNodeProvider";
import useWorkflowData from "@/components/workflow/hooks/useWorkflowData";
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
  const [summary, setSummary] = useState<string[]>([]);
  const { endNodeSummary, setEndNodeMessage } = useEndNode();

  const { workflowData } = useWorkflowData();

  const runSimulation = async () => {
    try {
      setSummary([]);
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

      // CHECK STATUS
      if (res.status !== 200) {
        const { errors } = await res.json();
        throw errors;
      }

      // "Waiting for response"
      await simulateDelay(1800);
      setStep(2);
      const data = await res.json();

      // "Response received"
      await simulateDelay(1800);
      setStep(3);
      console.log("DATA ON CLIENT: ", data);

      // "Summary"
      await simulateDelay(1800);
      setSummary([data.message]);
      setStep(4);

      await simulateDelay(1800);
      setEndNodeMessage("Task Completed Successfully");
      setLoading(false);
    } catch (errors) {
      const errorMessage = endNodeSummary
        ? `
        Request Failed. Please check summary below for detailed information.`
        : `
        Request Failed. 
        Turn on summaries in EndNode configuration for detailed information.`;

      setError(errorMessage);
      setEndNodeMessage("Task failed.");
      setLoading(false);
      if (Array.isArray(errors)) {
        const prettySummary = errors.map(
          (e) => `${e.nodeType} -> ${e.field}: ${e.message}`
        );
        setSummary(prettySummary);
      }
    }
  };

  const onRerunSimulation = () => {
    setStep(-1);
    setError(null);
    setLoading(false);
    setSummary([]);
    setEndNodeMessage("Simulation Pending.");
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
          {error && <Label className="text-red-500">Error: {error}</Label>}
          {endNodeSummary && summary.length > 0 && (
            <Textarea
              className="pt-4"
              disabled
              value={summary
                .filter((s) => typeof s === "string" && s.trim().length > 0)
                .map((s, i) => `• ${s}`)
                .join("\n")}
            />
          )}
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
