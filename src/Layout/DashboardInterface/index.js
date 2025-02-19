import React from "react"; // React import
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "44px",
        }}
      >
        
        <Box>
          <IconButton>
            <HomeIcon sx={{ fontSize: "28px", color: "#002855" }} />
          </IconButton>
        </Box>

        {/* Menu Icon */}
        <Box>
          <IconButton>
            <MoreVertIcon sx={{ fontSize: "24px", color: "#555555" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


function IntegrationPage() {
  const router = useRouter();  

  const handleCreateNewProcess = () => {
    router.push("/reactflow"); // Navigate using router.push
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <Box sx={{ padding: "24px", maxWidth: "960px", margin: "auto" }}>
        {/* Quick Start Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: "#1D1D1D", fontSize: "16px" }}
          >
            ▶ What apps do you want to connect
          </Typography>
          <Box
            component="span"
            sx={{
              fontSize: "12px",
              color: "#005FCC",
              cursor: "pointer",
              ml: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            Hide Quick Start
            <span style={{ transform: "rotate(180deg)", marginLeft: "4px" }}>
              ▲
            </span>
          </Box>
        </Box>

        {/* Two Cards */}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Build an Integration */}
          <Card
            sx={{
              flex: "1 1 45%",
              border: "1px solid #ddd",
              boxShadow: "none",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              },
            }}
            onClick={handleCreateNewProcess}
          >
            <CardContent>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#1D1D1D",
                }}
              >
                ⚙️ Build an Integration
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#005FCC",
                  fontSize: "14px",
                  mt: "8px",
                  cursor: "pointer",
                }}
              >
                Create a new Process →
              </Typography>
            </CardContent>
          </Card>

          {/* Start with an Example */}
          <Card
            sx={{
              flex: "1 1 45%",
              border: "1px solid #ddd",
              boxShadow: "none",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#1D1D1D",
                }}
              >
                📖 Start with an example
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#005FCC",
                  fontSize: "14px",
                  mt: "8px",
                  cursor: "pointer",
                }}
              >
                Explore Process Library →
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Centered Integration Section */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#1D1D1D", fontSize: "20px" }}
          >
            Create an Integration
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555555", fontSize: "14px", mt: "8px" }}
          >
            Choose the apps you want to connect. Setup now or later.
          </Typography>
        </Box>

        {/* Integration Boxes */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            mt: 4,
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "100px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#005FCC", fontWeight: "bold" }}
            >
              + Select source app
            </Typography>
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "100px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#005FCC", fontWeight: "bold" }}
            >
              + Select target app
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IntegrationPage;