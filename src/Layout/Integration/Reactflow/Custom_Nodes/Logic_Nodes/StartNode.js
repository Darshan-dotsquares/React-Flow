import React, { useContext } from "react";
import { Handle, useReactFlow } from "@xyflow/react";
import "../CustomNode.css";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { FlowContext } from "@/context/FlowContext";

const StartNode = ({ data }) => {
  const { isFlowStarted, startFlow, resetFlow } = useContext(FlowContext);
  const { getEdges } = useReactFlow();

  const handleClick = () => {
    const connectedEdges = getEdges().filter((edge) => edge.source === data.id);

    if (connectedEdges.length > 0) {
      if (isFlowStarted) {
        resetFlow();
      } else {
        startFlow();
      }
    } else {
      alert("Connect the Start Node to the flow.");
    }
  };

  // console.log("Flow started in Start Node:", isFlowStarted);

  return (
    <>
      <div
        className="container"
        style={{
          borderRadius: "50%",
          width: "61px",
          height: "61px",
          padding: "31px",
        }}
      >
        <Tooltip title="Start Node" placement="top">
          <Image
            src="/assets/start.png"
            alt="Start"
            width={50}
            height={50}
            margin={2}
            style={{
              cursor: "pointer",
              transition: "transform 0.3s", // Smooth effect for the spin
            }}
            className={isFlowStarted ? "spin" : ""} // Add spin class when isFlowStarted is true
            loading="eager"
            onClick={handleClick}
          />
        </Tooltip>
        <Handle type="source" position="right" />
      </div>
      <div className="node-label" style={{ width: "70px" }}>
        Start Node
      </div>
    </>
  );
};

export default StartNode;
