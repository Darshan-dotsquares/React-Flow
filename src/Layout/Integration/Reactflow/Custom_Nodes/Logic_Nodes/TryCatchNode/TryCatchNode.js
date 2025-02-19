import React, { useContext, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "../../CustomNode.css";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { FlowContext } from "@/context/FlowContext";

const TryCatchNode = ({ data, id, position }) => {
  const { getEdges, getNode, setNodes } = useReactFlow();
  const { isFlowStarted } = useContext(FlowContext);

  useEffect(() => {
    const updateTryCatchNode = () => {
      if (!isFlowStarted) {
        // console.log("Flow is not started. Try/Catch node is inactive.");
        return;
      }

      const connectedEdges = getEdges().filter((edge) => edge.target === id);
      if (connectedEdges.length === 0) {
        // console.log("Try/Catch node is not connected to any node.");
        return;
      }

      // console.log("Try/Catch node is active. Processing data...");
      const connectedData = connectedEdges
        .map((edge) => {
          const sourceNode = getNode(edge.source);
          return sourceNode ? sourceNode.data.outputData : null;
        })
        .filter(Boolean);

      if (connectedData.length > 0) {
        // Data exists, pass it to TryTargetNode
        setNodes((nodes) =>
          nodes.map((node) => {
            const tryEdge = getEdges().find(
              (edge) =>
                edge.source === id &&
                edge.target === node.id &&
                edge.sourceHandle === "try"
            );

            if (tryEdge) {
              return {
                ...node,
                data: {
                  ...node.data,
                  outputData: connectedData[0], // Pass connected data
                },
              };
            }

            return node;
          })
        );

        // Clear error message in CatchTargetNode
        setNodes((nodes) =>
          nodes.map((node) => {
            const catchEdge = getEdges().find(
              (edge) =>
                edge.source === id &&
                edge.target === node.id &&
                edge.sourceHandle === "catch"
            );

            if (catchEdge) {
              return {
                ...node,
                data: {
                  ...node.data,
                  outputData: null, // Clear error
                },
              };
            }

            return node;
          })
        );
      } else {
        // No data, pass error message to CatchTargetNode
        setNodes((nodes) =>
          nodes.map((node) => {
            const catchEdge = getEdges().find(
              (edge) =>
                edge.source === id &&
                edge.target === node.id &&
                edge.sourceHandle === "catch"
            );

            if (catchEdge) {
              return {
                ...node,
                data: {
                  ...node.data,
                  outputData: "Error: No data received", // Pass error message
                },
              };
            }

            return node;
          })
        );

        // Clear TryTargetNode data
        setNodes((nodes) =>
          nodes.map((node) => {
            const tryEdge = getEdges().find(
              (edge) =>
                edge.source === id &&
                edge.target === node.id &&
                edge.sourceHandle === "try"
            );

            if (tryEdge) {
              return {
                ...node,
                data: {
                  ...node.data,
                  outputData: null, // Clear Try node data
                },
              };
            }

            return node;
          })
        );
      }
    };

    const interval = setInterval(updateTryCatchNode, 2000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [getEdges, getNode, setNodes, id, isFlowStarted]);

  return (
    <>
      <div className="container">
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          // className="node-handle"
        />
        <Tooltip title="Try/Catch Node" placement="top">
          <Image
            src="/assets/trycatch.png"
            alt="Try/Catch"
            width={50}
            height={50}
            style={{ cursor: "pointer" }}
            loading="eager"
          />
        </Tooltip>
        <Handle
          type="source"
          position={Position.Right}
          id="try"
          className="node-handle try-handle"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="catch"
          // className="node-handle catch-handle"
        />
      </div>
      <div className="node-label">Try/Catch</div>
    </>
  );
};

export default TryCatchNode;
