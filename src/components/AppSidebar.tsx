import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeIcon from "@mui/icons-material/Home";
import "../assets/sidebar.css";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box } from "@mui/system";

const AppSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="sidebar_wrapper">
      <Sidebar
        backgroundColor="#2f3542"
        defaultCollapsed={menuOpen}
        className="sidebar"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ml: 1 }}
            onClick={(e) => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>
          {!menuOpen && (
            <Link to="/" state={{ pageTitle: "Dashboard" }}>
              <Typography
                variant="h3"
                align="center"
                sx={{ position: "relative", top: "7px" }}
              >
                iCurify
              </Typography>
            </Link>
          )}
        </Box>
        <Menu>
          {/* <SubMenu label="Charts" icon={<HomeIcon />} className="submenu">
            <MenuItem active className="item">
              Pie charts
            </MenuItem>
            <MenuItem className="item" icon={<HomeIcon />}>
              Line charts
            </MenuItem>
          </SubMenu> */}
          <MenuItem
            className="item"
            routerLink={<Link to="/" state={{ pageTitle: "Dashboard" }} />}
            icon={<HomeIcon />}
          >
            <Typography>Dashboard</Typography>
          </MenuItem>
          <MenuItem
            className="item"
            routerLink={<Link to="/profile" state={{ pageTitle: "Profile" }} />}
            icon={<Person2Icon />}
          >
            <Typography>Profile</Typography>
          </MenuItem>
          <SubMenu label="Settings" icon={<SettingsIcon />} className="submenu">
            <MenuItem
              className="item"
              icon={<LocalHospitalIcon />}
              routerLink={
                <Link
                  to="/medial-list"
                  state={{ pageTitle: "Medical Academy List" }}
                />
              }
            >
              Medical List
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
