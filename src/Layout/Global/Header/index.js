import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <AppBar
      position="sticky" // Change position to fixed
      top="0"
      sx={{
        backgroundColor: "White",
        width: "100%", // Ensure it spans the full width
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            color: "black",
            flexGrow: 1,
            fontSize: "26px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <img
            src="/assets/images.png" // Provide the path to your image
            alt="React Flow"
            style={{
              height: "60px", // Adjust as needed
              objectFit: "contain",
              marginTop: "10px",
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              right: "82%",
              top: "25%",
              fontSize: "101%",
            }}
          >
            𝗥𝗲𝗮𝗰𝘁 𝗙𝗹𝗼𝘄
          </Typography>
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button
            onClick={handleRedirect}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              marginLeft: "295px",
              backgroundColor: "#CD5C5C", // Login color
              fontWeight: "bold",
              borderRadius: "17px", // rounded corners
              textTransform: "none", // disable uppercase
            }}
          >
            Login
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={handleMenuClick}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem onClick={handleMenuClose}>About</MenuItem>
          <MenuItem onClick={handleMenuClose}>Services</MenuItem>
          <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
