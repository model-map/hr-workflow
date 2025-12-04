import {
  BetweenHorizonalEnd,
  BetweenHorizonalStart,
  Bot,
  CheckCheck,
  Workflow,
} from "lucide-react";

export const COMPONENTS = [
  {
    icon: <BetweenHorizonalStart />,
    type: "startNode",
    label: "Start Node",
  },
  {
    icon: <Workflow />,
    type: "taskNode",
    label: "Task Node",
  },
  {
    icon: <CheckCheck />,
    type: "approvalNode",
    label: "Approval Node",
  },
  {
    icon: <Bot />,
    type: "automatedNode",
    label: "Automated Node",
  },
  {
    icon: <BetweenHorizonalEnd />,
    type: "endNode",
    label: "End Node",
  },
] as const;

export type WorkflowComponentType = (typeof COMPONENTS)[number]["type"];
