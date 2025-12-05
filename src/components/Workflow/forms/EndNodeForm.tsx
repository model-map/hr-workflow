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
import { Node, useNodesData, useReactFlow } from "@xyflow/react";

// NODE DATA
type NodeData = {
  title?: string;
  metadata?: Record<string, unknown>;
};

// FORM SCHEMA SPECS HERE
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const EndNodeForm = ({ node }: { node: Node }) => {
  const { updateNodeData } = useReactFlow();
  const nodeData: NodeData | undefined = useNodesData(node.id)?.data;

  const title = nodeData?.title ?? "";
  const metadata = nodeData?.metadata ?? {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      metadata: metadata,
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Task Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata"
          render={({ field }) => {
            const entries = Object.entries(field.value ?? {});
            const [key, rawValue] = entries[0] ?? ["", ""];
            const value = rawValue != null ? String(rawValue) : "";

            return (
              <FormItem>
                <FormLabel>Metadata</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder="key"
                      value={key}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        field.onChange({
                          [newKey]: value,
                        });
                      }}
                    />
                    <Input
                      placeholder="value"
                      value={value}
                      onChange={(e) => {
                        if (!key) return;
                        field.onChange({
                          [key]: e.target.value,
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default EndNodeForm;
