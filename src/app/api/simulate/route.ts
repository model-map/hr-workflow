import { WorkflowSchema } from "@/components/workflow/utils/nodeSchema.types";
import { REQUIRED_PATH } from "@/components/workflow/utils/WorkflowNodeRegistry";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const validationResult = WorkflowSchema.safeParse(data);

  if (!validationResult.success) {
    // Validation failed
    const errors = validationResult.error.issues.map((err) => {
      const index = err.path[0] as number;
      const nodeType = data[index].type;
      const field = err.path[2];
      const message = err.message;
      return {
        nodeType,
        field,
        message,
      };
    });
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Valid data
  const validData = validationResult.data;

  return NextResponse.json(
    { ok: true, message: "Data Validation Successful" },
    { status: 200 }
  );
}
