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
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/shadcn_ui/button";
import { Node, useNodesData, useReactFlow } from "@xyflow/react";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { APPROVERS_DATA } from "../utils/approversData";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

// NODE DATA
type NodeData = {
  title?: string;
  approver?: "Manager" | "HRBP" | "Director";
  approved?: boolean;
};

// FORM SCHEMA SPECS HERE
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  approver: z.enum(["Manager", "HRBP", "Director"], {
    message: "Please select an approver",
  }),
  approved: z.boolean(),
});

const taskThresholdValue = Math.floor(Math.random() * 5) + 1;

// COMPONENT
const ApprovalNodeForm = ({ node }: { node: Node }) => {
  const { updateNodeData } = useReactFlow();
  const nodeData: NodeData | undefined = useNodesData(node.id)?.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: nodeData?.title ?? "",
      approver: nodeData?.approver ?? "Manager",
      approved: false,
    },
  });

  const approver = useWatch({
    control: form.control,
    name: "approver",
  });

  const threshHoldValue = useMemo(() => {
    return APPROVERS_DATA.find((a) => a.label === approver)
      ?.threshold as number;
  }, [approver]);

  useEffect(() => {
    console.log("NODE DATA: ", nodeData);
    const autoApproved = taskThresholdValue > threshHoldValue;

    // Only update approved without touching the dropdown
    form.setValue("approved", autoApproved || nodeData?.approved || false);

    if (autoApproved && !nodeData?.approved) {
      updateNodeData(
        node.id,
        { ...nodeData, approved: true },
        { replace: true }
      );
    }
  }, [nodeData, threshHoldValue, form, node.id, updateNodeData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateNodeData(node.id, { ...values, approved: true }, { replace: true });
  }

  function onDecline(values: z.infer<typeof formSchema>) {
    updateNodeData(node.id, { ...values, approved: false }, { replace: true });
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
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
        <FormItem>
          <FormLabel>Task Threshold Value</FormLabel>
          <FormDescription>
            (Randomly Generated for prototype, Refresh Page for new value)
          </FormDescription>
          <FormControl>
            <Input value={taskThresholdValue} disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="approved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Approved?</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  readOnly
                  className="h-4 w-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
            {taskThresholdValue > threshHoldValue
              ? "Submit (Auto approved)"
              : "Approve"}
          </Button>
          {taskThresholdValue <= threshHoldValue ? (
            <Button
              type="button"
              className="w-full"
              onClick={form.handleSubmit(onDecline)}
            >
              Decline
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
};
export default ApprovalNodeForm;
