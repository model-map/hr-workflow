import useWorkflowData from "@/components/workflow/hooks/useWorkflowData";

const SerialiseWorkflowData = () => {
  const { workflowData } = useWorkflowData();
  const serializedWorkflowData = JSON.stringify(workflowData);

  return <div>SerialiseWorkflowData</div>;
};
export default SerialiseWorkflowData;
