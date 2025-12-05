import { Edge, Node } from "@xyflow/react";
import { REQUIRED_PATH } from "./WorkflowNodeRegistry";

export function workflowValidator(nodes: Node[], edges: Edge[]): boolean {
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const outgoing = new Map<string, string>();

  for (const e of edges) {
    outgoing.set(e.source, e.target);
  }

  const start = nodes.find((n) => n.type === "startNode");
  if (!start) {
    return false;
  }

  let current: Node | undefined = start;

  console.log("in workflowValidator.ts");
  for (let i = 0; i < REQUIRED_PATH.length; i++) {
    console.log(`
      NODE at POSITION ${i}: ${current?.type}
      `);

    if (!current || current.type !== REQUIRED_PATH[i]) {
      return false;
    }

    if (i === REQUIRED_PATH.length - 1) {
      // THIS WILL ONLY BE TRUE WHEN THE LAST NODE is endNode
      return true;
    }

    const nextId = outgoing.get(current.id);
    if (!nextId) {
      return false;
    }
    current = nodeById.get(nextId);
  }
  return false;
}
