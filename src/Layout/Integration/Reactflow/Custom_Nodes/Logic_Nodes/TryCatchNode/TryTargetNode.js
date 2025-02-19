import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Tooltip } from "@mui/material";
import Image from "next/image";

const TryTargetNode = ({ data }) => {
  // console.log("data object of TryTargetNode", data);
  return (
    <>
      <div
        className="try-target-node"
        style={{
          ...styles.container,
          border: data?.outputData ? "2px solid green" : "1px solid #ccc",
        }}
      >
        <Tooltip title="Try Node" placement="top">
          <Image
            src="/assets/try2.png"
            alt="Try"
            width={50}
            height={50}
            margin={2}
            style={{ cursor: "pointer" }}
            loading="eager"
          />
        </Tooltip>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
      <div className="node-label">Try</div>
    </>
  );
};

const styles = {
  container: {
    width: "61px",
    height: "56px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "14px",
    position: "relative",
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default TryTargetNode;
