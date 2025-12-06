import { createContext, useContext, useState } from "react";

type EndNodeContextType = {
  endNodeMessage: string;
  setEndNodeMessage: (v: string) => void;
  endNodeSummary: boolean;
  setEndNodeSummary: (v: boolean) => void;
};

const EndNodeContext = createContext<EndNodeContextType | null>(null);

export const EndNodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [endNodeMessage, setEndNodeMessage] = useState("");
  const [endNodeSummary, setEndNodeSummary] = useState(true);

  return (
    <EndNodeContext.Provider
      value={{
        endNodeMessage,
        setEndNodeMessage,
        endNodeSummary,
        setEndNodeSummary,
      }}
    >
      {children}
    </EndNodeContext.Provider>
  );
};

const useEndNode = () => {
  const ctx = useContext(EndNodeContext);
  if (!ctx) throw new Error("useEndNode must be used inside EndNodeProvider");
  return ctx;
};

export default useEndNode;
