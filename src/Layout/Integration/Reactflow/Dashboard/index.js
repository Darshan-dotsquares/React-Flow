"use client";
import React, { useState } from "react";
import PrimaryNavBar from "../../../Global/PrimaryNavbar";
import SecondaryNavBar from "../../../Global/SecondaryNavbar";
import Sidebar from "../../../Global/Sidebar";
import Footer from "../../../Global/Footer";
import ComponentsPanel from "../../../Global/ComponentsPannel"; // Corrected the import name
import NavigationBar from "../NavigationBar";
import Flow from "../Flow";
import ProcessBox from "@/Layout/utills/ProcessBar";

const DashboardInner = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close
  const [isComponentsPanelOpen, setIsComponentsPanelOpen] = useState(true); // Manage ComponentsPanel visibility
  const [showMinimap, setShowMinimap] = useState(false); // Minimap visibility

  const toggleMinimap = () => {
    setShowMinimap((prev) => {
      console.log("Previous Minimap State:", prev); // Debugging
      return !prev; // Correctly toggle the state
    });
  };
  

  const bodyStyle = {
    margin: 0,
    padding: 0,
    height: "100vh",
    overflow: "hidden",
  };

  const dashboardContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  };

  const dashboardStyle = {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginTop: "0",
  };

  const contentStyle = {
    flex: 1,
    padding: "0px",
    // overflow: "auto",
    backgroundColor: "#f4f4f4",
    marginBottom: "40px",
  };

  const sidebarStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={bodyStyle}>
      <div style={dashboardContainer}>
        <PrimaryNavBar />
        <SecondaryNavBar />

        <div style={dashboardStyle}>
          {/* Sidebar and ComponentsPanel */}
          <div style={sidebarStyle}>
            <Sidebar
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              toggleComponentsPanel={() => setIsComponentsPanelOpen(!isComponentsPanelOpen)} // Pass the toggle function
            />
            {/* {isSidebarOpen && <ComponentsPanel />} */}
            {isComponentsPanelOpen && <ComponentsPanel />} {/* Show ComponentsPanel based on state */}
          </div>

          {/* Replacing the old content with DashboardInterface */}
          {
            <div style={contentStyle}>
           
              <NavigationBar />
              <Flow showMinimap={showMinimap}/>
              <ProcessBox toggleMinimap={toggleMinimap} showMinimap={showMinimap}/>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default DashboardInner;
