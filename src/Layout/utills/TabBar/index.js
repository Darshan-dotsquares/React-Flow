import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";

function TabBar() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // console.log("Searched item", event.target.value);
  };

  const TabItem = ({ label, nodeType }) => (
    <ListItem
      sx={{
        padding: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <ListItemIcon
        sx={{ minWidth: 30, display: "flex", alignItems: "center" }}
      >
        <Image
          src={`/assets/${label.toLowerCase().replace(" ", "")}.png`}
          width={25}
          height={25}
          alt="TabBar Node Images"
          layout="intrinsic"
          style={{ marginRight: "8px" }}
        />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  const tabContent = [
    [
      { label: "MongoDb", nodeType: "MongoDbConnectorNode" },
      { label: "SQL", nodeType: "SqlDbConnectorNode" },
      { label: "Appwrite", nodeType: "AppwriteConnectorNode" },
    ],
    [
      { label: "Map", nodeType: "MapNode" },
      { label: "Set Property", nodeType: "SetPropertyNode" },
      { label: "Message", nodeType: "MessageNode" },
      { label: "Notify", nodeType: "NotifyNode" },
      { label: "Program Command", nodeType: "ProgramCommandNode" },
      { label: "Data Action", nodeType: "DataActionNode" },
      { label: "Database Operations", nodeType: "DatabaseOperationsNode" },
    ],
    [
      { label: "Try Catch", nodeType: "TryCatchNode" },
      { label: "Start", nodeType: "StartNode" },
      { label: "Stop", nodeType: "StopNode" },
    ],
  ];

  // Combine all tab contents into one array for searching across all tabs

  const allTabContent = tabContent.flat();

  // Filter the combined content based on the searchTerm

  const filteredTabContent = allTabContent.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTabContentForTab = tabContent[tabValue].filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card
      sx={{
        width: 280,
        height: 345,
        boxShadow: 1,
        marginBottom: 3,
        position: "absolute",
        top: "225px",
        marginLeft: "70px",
      }}
    >
      <CardContent>
        <TextField
          fullWidth
          label="Search all steps"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />
        {!searchTerm && (
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Connect" />
            <Tab label="Execute" />
            <Tab label="Logic" />
          </Tabs>
        )}

        {/* When searching, show filtered results */}

        {searchTerm && (
          <Box sx={{ height: 200, overflowY: "auto" }}>
            {filteredTabContent.length > 0 ? (
              <List>
                {filteredTabContent.map((item, index) => (
                  <TabItem
                    key={index}
                    label={item.label}
                    nodeType={item.nodeType}
                  />
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Image
                  src="/assets/not_found.png"
                  width={80}
                  height={80}
                  alt="No results found"
                />
                <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                  <strong style={{marginTop: '23px'}}>No Results</strong>
                  <span>Check spelling or try searching with a new keyword.</span>
                </p>
              </Box>
            )}
          </Box>
        )}
        {/* <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: 200,
            overflowY: "auto",
          }}
        >
          <List>
            {tabContent[tabValue].map((item, index) => (
              <TabItem
                key={index}
                label={item.label}
                nodeType={item.nodeType}
              />
            ))}
          </List>
        </Box> */}

        {/* When there is no search term, show the selected tab content */}

        {!searchTerm && (
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: 200,
              overflowY: "auto",
            }}
          >
            <List>
              {filteredTabContentForTab.map((item, index) => (
                <TabItem
                  key={index}
                  label={item.label}
                  nodeType={item.nodeType}
                />
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default TabBar;
