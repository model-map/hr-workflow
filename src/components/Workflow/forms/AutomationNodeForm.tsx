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
import useFetchAutomation from "../hooks/useFetchAutomation";
import { SelectDropdown, SelectItems } from "@/components/ui/select-dropdown";
import { useEffect } from "react";

// NODE DATA
type NodeData = {
  title?: string;
  action?: string;
  param?: string;
};

// FORM SCHEMA SPECS HERE
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  action: z.string().min(1, "Action is required"),
  param: z.string().min(1, "Param is required"),
});

const AutomationNodeForm = ({ node }: { node: Node }) => {
  const { automationActions } = useFetchAutomation();

  const selectActions: SelectItems[] =
    automationActions?.map((action) => ({
      id: action.id,
      label: action.label,
    })) ?? [];

  const { updateNodeData } = useReactFlow();

  const nodeData: NodeData | undefined = useNodesData(node.id)?.data;
  const title = nodeData?.title ?? "";
  const action = nodeData?.action ?? "";
  const param = nodeData?.param ?? "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      action: action,
      param: param,
    },
  });

  useEffect(() => {
    form.reset({ title, action, param });
  }, [title, action, form, param]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // UPDATE NODE DATA
    updateNodeData(node.id, values, { replace: true });
  }

  //   watch currently selected action and use it to get param, and action object
  const selectedAction = useWatch({
    control: form.control,
    name: "action",
  });

  useEffect(() => {
    form.setValue("param", "");
  }, [selectedAction, form]);

  const selectParameters =
    automationActions
      ?.find((action) => action.label === selectedAction)
      ?.params.map((param) => ({
        id: param,
        label: param,
      })) ?? [];

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
          name="action"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <FormControl>
                  <SelectDropdown
                    selectItems={selectActions}
                    placeholder="Select an action"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="param"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Param</FormLabel>
                <FormControl>
                  <SelectDropdown
                    selectItems={selectParameters}
                    placeholder="Select a Parameter"
                    value={field.value}
                    onChange={field.onChange}
                  />
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
export default AutomationNodeForm;
