import { useEffect, useState } from "react";

export type AutomationData = {
  id: string;
  label: string;
  params: string[];
};

const useFetchAutomation = () => {
  const [automationActions, setAutomationActions] =
    useState<AutomationData[]>();
  useEffect(() => {
    async function fetchActions() {
      const res = await fetch("/api/automation");
      const data = await res.json();
      setAutomationActions(data);
    }
    fetchActions();
  }, []);
  return { automationActions };
};
export default useFetchAutomation;
