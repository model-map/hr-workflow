import { Edge, Node, useReactFlow } from "@xyflow/react";
import { REQUIRED_PATH } from "./WorkflowNodeRegistry";

export function workflowValidator(nodes: Node[], edges: Edge[]): boolean {
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const outgoing = new Map<string, string>();

  for (const e of edges) {
    outgoing.set(e.source, e.target);
  }

  // console.log("in workflowValidator.ts");
  // console.log("nodeById MAP: ", nodeById);
  // console.log("outgoing MAP: ", outgoing);

  const start = nodes.find((n) => n.type === "startNode");
  if (!start) {
    return false;
  }

  let current = start;

  for (let i = 0; i < REQUIRED_PATH.length; i++) {
    if (current.type !== REQUIRED_PATH[i]) {
      return false;
    }

    const nextId = outgoing.get(current.id);

    if (i === REQUIRED_PATH.length - 1) {
      return nextId === undefined; // endNode case
    }

    if (!nextId) {
      return false;
    }
  }
}
