import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MongoDbConnectorNode from "../Custom_Nodes/Connector_Nodes/MongoDbConnectorNode";
import TryCatchNode from "../Custom_Nodes/Logic_Nodes/TryCatchNode/TryCatchNode";
import TryTargetNode from "../Custom_Nodes/Logic_Nodes/TryCatchNode/TryTargetNode";
import CatchTargetNode from "../Custom_Nodes/Logic_Nodes/TryCatchNode/CatchTargetNode";
import StartNode from "../Custom_Nodes/Logic_Nodes/StartNode";
import { FlowProvider } from "@/context/FlowContext";
import SqlDbConnectorNode from "../Custom_Nodes/Connector_Nodes/SqlDbConnectorNode";
import StopNode from "../Custom_Nodes/Logic_Nodes/StopNode";
import DataActionNode from "../Custom_Nodes/Execute_Nodes/DataActionNode";
import DatabaseOperationsNode from "../Custom_Nodes/Execute_Nodes/DatabaseOperationsNode";

const nodeTypes = {
  MongoDbConnectorNode: MongoDbConnectorNode,
  TryCatchNode: TryCatchNode,
  TryTargetNode: TryTargetNode,
  CatchTargetNode: CatchTargetNode,
  StartNode: StartNode,
  SqlDbConnectorNode: SqlDbConnectorNode,
  StopNode: StopNode,
  DataActionNode: DataActionNode,
  DatabaseOperationsNode: DatabaseOperationsNode,
};

let id = 0;
const getId = () => `node_${id++}`;

const Flow = ({ showMinimap }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { screenToFlowPosition } = useReactFlow();

  console.log("showMiniMap in flow file", showMinimap);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: {
          id: newNodeId,
          label: `${type}`,
        },
      };

      if (type === "TryCatchNode") {
        // Add TryCatchNode with predefined edges
        const tryTargetId = getId();
        const catchTargetId = getId();

        const TryTargetNode = {
          id: tryTargetId,
          type: "TryTargetNode",
          position: { x: position.x + 250, y: position.y - 40 },
          data: {
            id: tryTargetId,
            label: "Try",
          },
          sourcePosition: "right",
          targetPosition: "left",
        };

        const CatchTargetNode = {
          id: catchTargetId,
          type: "CatchTargetNode",
          position: { x: position.x + 250, y: position.y + 40 },
          data: {
            id: catchTargetId,
            label: "Catch",
          },
          sourcePosition: "right",
          targetPosition: "left",
        };

        const newEdges = [
          {
            id: `edge-${newNodeId}-try`,
            source: newNodeId,
            sourceHandle: "try",
            target: tryTargetId,
            type: "smoothstep",
            // animated: true,
          },
          {
            id: `edge-${newNodeId}-catch`,
            source: newNodeId,
            sourceHandle: "catch",
            target: catchTargetId,
            type: "smoothstep",
            // animated: true,
          },
        ];

        // Update nodes and edges state
        setNodes((nds) => nds.concat(newNode, TryTargetNode, CatchTargetNode));
        setEdges((eds) => eds.concat(newEdges));
      } else {
        // For other nodes, add normally
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [screenToFlowPosition]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <FlowProvider>
      <div style={{ height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
        >
          <Background />
          {showMinimap && (
            <MiniMap
              nodeColor={(node) => {
                if (node.type === "MongoDbConnectorNode") return "#599637";
                if (node.type === "TryCatchNode") return "#ffcc00";
                if (node.type === "TryTargetNode") return "#ffcc00";
                if (node.type === "CatchTargetNode") return "#ffcc00";
                if (node.type === "StartNode") return "#017ee0";
                if (node.type === "SqlDbConnectorNode") return "#3088d8";
                if (node.type === "StopNode") return "#e63937";
                if (node.type === "DataActionNode") return "#d1d1d1";
                if (node.type === "DatabaseOperationsNode") return "#757575";
                return "#9022CE"; // purple for other nodes
              }}
              nodeStrokeColor={(node) => {
                if (node.selected) return "#333"; // Dark border for selected nodes
                return "#fff"; // White border for unselected nodes
              }}
              nodeBorderRadius={5}
              maskColor="rgba(0, 0, 0, 0.2)"
              pannable={true}
              zoomable={true}
              ariaLabel="Mini map for the flow diagram"
            />
          )}
        </ReactFlow>
      </div>
    </FlowProvider>
  );
};

export default Flow;
