import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#323295", 
        color: "white", 
        padding: "20px 0",
        position: "relative",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {/* Platform Section */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Platform</Typography>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Reactflow Enterprise Platform
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Why Reactflow
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            iPaaS pricing & editions
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Compliance
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            What is iPaaS?
          </Link>
          <br></br>
        </Grid>

        {/* Solutions Section */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Solutions</Typography>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Manufacturing
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Healthcare & Life Sciences
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Retail
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Financial Services
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Higher Education
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Public Sector
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Software Providers
          </Link>
          <br></br>
        </Grid>

        {/* Connectors Section */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Connectors</Typography>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Salesforce
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            SAP
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            NetSuite
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Workday
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            ServiceNow
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            AWS
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            All Connectors
          </Link>
          <br></br>
        </Grid>

        {/* Resources Section */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Resources</Typography>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Events & Webinars
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Blog
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Case Studies
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Training
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Community
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            Documentation
          </Link>
          <br></br>
          <Link href="/" color="inherit" display="block" sx={{ textDecoration: "none" }}>
            All Resources
          </Link>
          <br></br>
        </Grid>
      </Grid>

      <Typography variant="body2" sx={{ marginTop: "20px" }}>
        &copy; 2024 ReactFlow All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
