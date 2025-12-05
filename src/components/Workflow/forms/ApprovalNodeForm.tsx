"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn_ui/form";
import { Input } from "@/components/shadcn_ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shadcn_ui/button";
import { Node, useReactFlow } from "@xyflow/react";

// NODE DATA
type NodeData = {
  title?: string;
};

// FORM SCHEMA SPECS HERE
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
});

const ApprovalNodeForm = ({ node }: { node: Node }) => {
  const { updateNodeData } = useReactFlow();
  const nodeData: NodeData | undefined = node.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: nodeData?.title ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // UPDATE NODE DATA
    updateNodeData(node.id, values, { replace: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="Enter Task Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default ApprovalNodeForm;
