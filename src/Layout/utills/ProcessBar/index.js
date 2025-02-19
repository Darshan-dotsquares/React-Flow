import React, { useState } from "react";
import { Box, Typography, TextField, Grid, IconButton } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import InfoIcon from "@mui/icons-material/Info";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import MapIcon from "@mui/icons-material/Map";
import NotesIcon from "@mui/icons-material/Notes";
import GridViewIcon from "@mui/icons-material/GridView";
import TabBar from "@/Layout/utills/TabBar/index.js";

export default function ProcessBox({ toggleMinimap, showMinimap }) {
  const [showTabs, setShowTabs] = useState(false);
  const [closeTabs, setCloseTabs] = useState(true);
  const [name, setName] = useState(""); // State to store the value of TextField
  const [isEditing, setIsEditing] = useState(false); // Manage editing state

  const handleBlur = () => {
    setIsEditing(false); // Save automatically when the field loses focus
  };

  const handleFocus = () => {
    setIsEditing(true); // Switch to editing mode when the field is focused
    if (name) {
      setName(name);
    } else {
      setName("New Process");
    }
  };

  const handleChange = (event) => {
    setName(event.target.value); // Update the name as the user types
  };

  const handleClick = () => {
    setShowTabs((prevState) => !prevState);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          position: "fixed",
          top: "150px",
          width: "-webkit-fill-available",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
            border: "1px solid #ccc",
            flexGrow: 1,
            justifyContent: "space-between",
            height: "43px",
            background: "white",
            width: "5rem",
          }}
        >
          <SettingsSuggestIcon />

          {isEditing ? (
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{
                width: "400px",
                fontWeight: "bold",
                "& .MuiInputBase-root": {
                  height: "18px", // Set the height of the input field
                },
              }}
              height={8}
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", cursor: "pointer", width: "400px" }}
              onClick={() => setIsEditing(true)}
            >
              {name || "New Process"}
            </Typography>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "normal" }}>
              Process
            </Typography>
            <InfoIcon sx={{ marginLeft: 1, fontSize: 20 }} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <FolderCopyIcon />
            <ContentPasteIcon />
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
            border: "1px solid #ccc",
            width: "9%",
            justifyContent: "center",
            background: "white",
            marginLeft: "21px",
            marginRight: "15px",
            height: "43px",
          }}
        >
          <LocalDrinkIcon />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Test
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "43px",
          }}
        >
          <Stack spacing={1} direction="row">
            <Button
              sx={{
                marginRight: 2,
                padding: 1,
                background: "white",
                maxHeight: "43px",
                borderColor: "#002855",
                color: "#002855",
              }}
              variant="outlined"
            >
              Save & Close
            </Button>
            <Button
              sx={{
                marginRight: 2,
                padding: 1,
                width: "80px",
                maxHeight: "43px",
                background: "#002855",
              }}
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex", // Use flexbox to align items horizontally
          flexDirection: "row", // Align children (icons and TabsPage) in a row
          padding: 2,
          width: "100%",
        }}
      >
        {/* Left side with icon buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 2,
            gap: 2,
            width: "8%", // You can adjust the width as needed
            position: "absolute",
            top: "213px",
          }}
        >
          {/* Add clickable icons with rounded borders */}
          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "#002855",
              color: "#f4f4f4",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#002855",
                color: "#f4f4f4",
              },
            }}
            onClick={handleClick}
          >
            <RoundaboutRightIcon />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "#f4f4f4",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "1px solid #002855",
                color: "#002855",
              },
            }}
          >
            <GridViewIcon />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "10px",
              color: showMinimap ? "#002855" : "#707070",
              border: showMinimap ? "1px solid #002855" : "1px solid #ccc",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "1px solid #002855",
                color: "#002855",
              },
            }}
            onClick={toggleMinimap} // Call function on click
          >
            <MapIcon />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "#f4f4f4",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "1px solid #002855",
                color: "#002855",
              },
            }}
          >
            <NotesIcon />
          </IconButton>
        </Box>

        {/* Right side with TabsPage */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 1,
            flexGrow: 1,
          }}
        >
          {showTabs && <TabBar />}
        </Box>
      </Box>
    </>
  );
}
