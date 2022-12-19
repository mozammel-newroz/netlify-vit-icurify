import React from "react";
import { Box } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import AppRoute from "./AppRouter";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <ProSidebarProvider>
      <Box style={{ display: "flex" }}>
        <Box>
          <AppSidebar />
        </Box>
        <Box style={{ flex: 1, margin: "0px" }}>
          <Topbar />
          <Box
            style={{
              padding: 24,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ProSidebarProvider>
  );
};

export default Layout;
