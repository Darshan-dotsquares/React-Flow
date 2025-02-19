"use client";
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LayersIcon from "@mui/icons-material/Layers";

const Sidebar = ({ toggleComponentsPanel }) => {
  const [isClose, setIsClose] = useState(true); // Sidebar starts closed

  // On component mount, check local storage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState !== null) {
      setIsClose(JSON.parse(savedState)); // Restore state from local storage
    }
  }, []);

  // Update local storage whenever state changes
  const toggleSidebar = () => {
    const newState = !isClose;
    setIsClose(newState);
    localStorage.setItem("sidebarState", JSON.stringify(newState)); // Save state
  };

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    width: isClose ? "60px" : "220px", // Default closed
    transition: "width 0.3s ease",
    height: "calc(100vh - 80px)",
    // boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    paddingTop: "10px",
    position: "relative",
    paddingBottom: "30px",
    borderRight: "1px solid lightgrey",
  };

  const iconContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: isClose ? "center" : "flex-start",
    gap: "20px",
    marginBottom: "auto",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    color: "#333",
    fontWeight: 500,
    fontSize: "14px",
    padding: "10px 8px",
    transition: "background-color 0.3s",
    width: "100%",
  };

  const closeButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: isClose ? "center" : "flex-start",
    cursor: "pointer",
    color: "#555",
    fontSize: "14px",
    padding: "5px",
    position: "absolute",
    bottom: "120px",
    left: 0,
    right: 0,
  };

  const chevronStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  };

  return (
    <div style={sidebarStyle}>
      <div style={iconContainer}>
        {/* Create New */}
        <div style={itemStyle}>
          <Tooltip title="Create New" placement="right">
            <IconButton>
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {!isClose && <Typography>Create New</Typography>}
        </div>

        {/* Process Library */}
        <div style={itemStyle}>
          <Tooltip title="Process Library" placement="right">
            <IconButton>
              <MenuBookIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {!isClose && <Typography>Process Library</Typography>}
        </div>

        {/* Component Explorer */}
        <div style={itemStyle} onClick={toggleComponentsPanel}>
          <Tooltip title="Component Explorer" placement="right">
            <IconButton>
              <LayersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {!isClose && <Typography>Component Explorer</Typography>}
        </div>
      </div>

      {/* Open/Close Sidebar */}
      <div style={closeButtonStyle} onClick={toggleSidebar}>
        <Tooltip title={isClose ? "Expand" : "Collapse"} placement="right">
          <IconButton
            style={{
              width: "35px",
              height: "35px",
              marginRight: isClose ? "0px" : "15px",
              marginLeft: isClose ? "0px" : "5px",
            }}
          >
            {/* Dynamically show double-chevron text */}
            <Typography style={chevronStyle}>{isClose ? "»" : "«"}</Typography>
          </IconButton>
        </Tooltip>
        {!isClose && <Typography>Close Sidebar</Typography>}
      </div>
    </div>
  );
};

export default Sidebar;
