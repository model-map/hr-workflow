import { Handle, HandleProps } from "@xyflow/react";

const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      {...props}
      // className="border border-dotted"
      style={{
        width: "1em",
        height: "1em",
        border: "2px solid black",
        borderRadius: "50%",
        backgroundColor: "transparent",
      }}
    />
  );
};
export default CustomHandle;
