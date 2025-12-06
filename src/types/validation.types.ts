import { z } from "zod";

export const ValidateStartNodeSchema = z.object({
  title: z.string().min(1),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type ValidateStartNodeType = z.infer<typeof ValidateStartNodeSchema>;
