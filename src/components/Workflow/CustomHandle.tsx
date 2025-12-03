import { Handle, HandleProps } from "@xyflow/react";

const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      {...props}
      className="border border-dotted"
      style={{
        border: "2px dashed black",
        width: "1em",
        height: "1em",
      }}
    />
  );
};
export default CustomHandle;
