import {
  ApprovalNodeSchema,
  AutomatedNodeSchema,
  EndNodeSchema,
  StartNodeSchema,
  TaskNodeSchema,
} from "./nodeSchema.types";

const StartNodeDataSchema = StartNodeSchema.shape.data;
const TaskNodeDataSchema = TaskNodeSchema.shape.data;
const ApprovalNodeDataSchema = ApprovalNodeSchema.shape.data;
const AutomatedNodeDataSchema = AutomatedNodeSchema.shape.data;
const EndNodeDataSchema = EndNodeSchema.shape.data;

export {
  StartNodeDataSchema,
  TaskNodeDataSchema,
  ApprovalNodeDataSchema,
  AutomatedNodeDataSchema,
  EndNodeDataSchema,
};
