"use client";

import {
  Form,
  FormControl,
  FormDescription,
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
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { APPROVERS_DATA } from "../utils/approversData";
import { useMemo, useState } from "react";

// NODE DATA
type NodeData = {
  title?: string;
  approver?: "Manager" | "HRBP" | "Director";
};

// FORM SCHEMA SPECS HERE
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  approver: z.enum(["Manager", "HRBP", "Director"], {
    message: "Please select an approver",
  }),
});

const ApprovalNodeForm = ({ node }: { node: Node }) => {
  const [taskThresholdValue] = useState(
    () => Math.floor(Math.random() * 5) + 1
  );

  const { updateNodeData } = useReactFlow();
  const nodeData: NodeData | undefined = node.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: nodeData?.title ?? "",
      approver: nodeData?.approver ?? "Manager",
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
        <FormField
          control={form.control}
          name="approver"
          render={({ field }) => {
            const thresholdValue = APPROVERS_DATA.find(
              (approver) => approver.label === field.value
            )?.threshold;
            return (
              <>
                <FormItem>
                  <FormLabel>Approver</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      selectItems={APPROVERS_DATA}
                      placeholder="Select an approver"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Threshold Value</FormLabel>
                  <FormDescription>(Cannot be edited)</FormDescription>
                  <FormControl>
                    <Input value={thresholdValue} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="approver"
          render={() => (
            <FormItem>
              <FormLabel>Task Threshold Value</FormLabel>
              <FormDescription>
                (Randomly Generated for prototype, Cannot be edited)
              </FormDescription>
              <FormControl>
                <Input value={taskThresholdValue} disabled />
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
