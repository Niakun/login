'use client';
import React from 'react';
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          height: "70px",
          backgroundColor: "#1976d2",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Header
      </Box>

      <Box sx={{ flex: 1, display: "flex" }}>
        <Box
          sx={{
            width: "150px",
            backgroundColor: "gray",
            marginTop: "10px",
            height: "calc(100vh - 70px)",
            position: "sticky",
            top: "70px",
                        borderRadius: "4px",

            left: 0,
          }}
        >
          Sidebar
        </Box>

        <Box
          sx={{
            flex: 1,
            marginLeft: "10px",
            marginTop: "10px",
            marginRight: "20px",
            backgroundColor: "black",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          Content Area
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
