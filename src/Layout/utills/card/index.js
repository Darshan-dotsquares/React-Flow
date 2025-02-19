import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const ImageTextCard = () => {
  // State to track hover for each card and index of hovered title
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Image data for the cards
  const images = [
    ["/assets/new.webp", "/assets/new.webp"],
    ["/assets/new2.webp", "/assets/new2.webp"],
    ["/assets/new3.webp", "/assets/new3.webp"],
  ];

  // Titles for each card
  const titles = [
    "API Management Discover, manage, and govern all your APIs in one place",
    "Streamline business processes that span applications",
    "Data Management Secure, sync, and trust your data",
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {titles.map((title, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderRadius: 2,
              marginLeft: "19px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Left side: Text */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 2,
                width: "50%",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover, manage, and govern all your APIs in one place.
                  Centralize API management across gateways, unlock API value
                  through API products, and fortify governance with consistent
                  policies.
                </Typography>
              </CardContent>
            </Box>

            <CardMedia
              component="img"
              sx={{ width: "50%", objectFit: "cover" }}
              image={
                hoveredIndex === index ? images[index][1] : images[index][0]
              } // Change image on hover
              alt={`${title} image`}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ImageTextCard;
