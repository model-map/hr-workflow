import { z } from "zod";

const StartNodeSchema = z.object({
  type: z.literal("startNode"),
  data: z.object({
    title: z.string("Title is required.").min(5, {
      message: "Title must be at least 5 characters.",
    }),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

const TaskNodeSchema = z.object({
  type: z.literal("taskNode"),
  data: z.object({
    title: z.string("Title is required.").min(5, {
      message: "Title must be at least 5 characters.",
    }),
    description: z.string("Description is required.").min(5, {
      message: "Description must be at least 5 characters.",
    }),
    assignee: z.string("Assignee is required.").min(3, {
      message: "Assignee must be at least 3 characters.",
    }),
    dueDate: z.iso.datetime({ message: "Please select a Date" }),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

const ApprovalNodeSchema = z.object({
  type: z.literal("approvalNode"),
  data: z.object({
    title: z.string("Title is required.").min(5, {
      message: "Title must be at least 5 characters.",
    }),
    approver: z.enum(["Manager", "HRBP", "Director"], {
      message: "Please select an approver",
    }),
    approved: z.boolean(),
  }),
});

const AutomatedNodeSchema = z.object({
  type: z.literal("automatedNode"),
  data: z.object({
    title: z.string("Title is required").min(5, {
      message: "Title must be at least 5 characters.",
    }),
    action: z.string("Action is required").min(1, "Action is required"),
    param: z.string("Param is required").min(1, "Param is required"),
  }),
});

const EndNodeSchema = z.object({
  type: z.literal("endNode"),
  data: z.object({
    title: z.string("Title is required").min(5, {
      message: "Title must be at least 5 characters.",
    }),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

const WorkflowSchema = z.array(
  z.discriminatedUnion("type", [
    StartNodeSchema,
    TaskNodeSchema,
    ApprovalNodeSchema,
    AutomatedNodeSchema,
    EndNodeSchema,
  ])
);

export {
  StartNodeSchema,
  TaskNodeSchema,
  ApprovalNodeSchema,
  AutomatedNodeSchema,
  EndNodeSchema,
  WorkflowSchema,
};
