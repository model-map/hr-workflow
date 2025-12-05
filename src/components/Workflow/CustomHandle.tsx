import { Handle, HandleProps, useNodeConnections } from "@xyflow/react";

type CustomHandleType = {
  connectionCount?: number;
} & HandleProps;

const CustomHandle = ({
  connectionCount,
  ...handleProps
}: CustomHandleType) => {
  const connections = useNodeConnections({
    handleType: handleProps.type,
  });

  return (
    <Handle
      {...handleProps}
      isConnectable={
        connectionCount !== undefined
          ? connections.length < connectionCount
          : true
      }
      style={{
        width: "1em",
        height: "1em",
        border: "2px solid black",
        borderRadius: "50%",
        // backgroundColor: "transparent",
        backgroundColor: handleProps.type === "source" ? "#4f46e5" : "#dc2626",
      }}
    >
      {/* {handleProps.type === "source" ? <p>source</p> : <p>target</p>} */}
    </Handle>
  );
};
export default CustomHandle;
