import React from "react";
import { Tooltip } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";

const StopNode = ({data}) => {
    // console.log('Stop Node data',data)
  return (
    <>
      <div className="container">
        <Handle
          type="target"
          position={Position.Left}
        />
        <Tooltip title="Stop Node" placement="top">
          <Image
            src="/assets/stop.png"
            alt="Stop"
            width={50}
            height={50}
            style={{ cursor: "pointer" }}
            loading="eager"
          />
        </Tooltip>
        {/* <Handle
          type="source"
          position={Position.Right}
        /> */}
      </div>
      <div className="node-label">Stop/End</div>
    </>
  );
};

export default StopNode;
