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
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/shadcn_ui/button";
import { Node, useNodesData, useReactFlow } from "@xyflow/react";
import { EndNodeDataSchema } from "../utils/formSchema.types";

import { Label } from "@/components/shadcn_ui/label";
import { Checkbox } from "@/components/shadcn_ui/checkbox";
import { useEffect } from "react";
import useEndNode from "../hooks/EndNodeProvider";

// NODE DATA
type NodeData = {
  message?: string;
  summary?: boolean;
};

// FORM SCHEMA SPECS HERE
const formSchema = EndNodeDataSchema;

const EndNodeForm = ({ node }: { node: Node }) => {
  const {
    endNodeMessage,
    setEndNodeMessage,
    endNodeSummary,
    setEndNodeSummary,
  } = useEndNode();

  const { updateNodeData } = useReactFlow();
  const nodeData: NodeData | undefined = useNodesData(node.id)?.data;

  const message = endNodeMessage === "" ? "Simulation Pending" : endNodeMessage;
  const summary = nodeData?.summary ?? true;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: message,
      summary: summary,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // UPDATE NODE DATA
    const { message, summary } = values;
    setEndNodeMessage(message);
    setEndNodeSummary(summary);
    updateNodeData(node.id, values, { replace: true });
  }

  const messageWatch = useWatch({
    control: form.control,
    name: "message",
  });

  const summaryWatch = useWatch({
    control: form.control,
    name: "summary",
  });

  useEffect(() => {
    setEndNodeMessage(messageWatch);
  }, [messageWatch, setEndNodeMessage]);

  useEffect(() => {
    setEndNodeSummary(summaryWatch);
  }, [summaryWatch, setEndNodeSummary]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Message</FormLabel>
              <FormControl>
                <Input {...field} value={endNodeMessage} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <div className="flex gap-2 items-center ">
              <Label>Summary</Label>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
export default EndNodeForm;
