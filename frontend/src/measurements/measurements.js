import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import HandymanIcon from "@mui/icons-material/Handyman";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ContentCutIcon from "@mui/icons-material/ContentCut";

import UINavDrawer from "../UI/app_drawers";
import UIAppBar from "../UI/app_bar";
import UIAppBody from "../UI/app_body";

const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      <ListItem button key="Projects" component="a" href="/projects">
        <ListItemIcon>
          <HandymanIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button key="Patterns" component="a" href="/patterns">
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Sewing Patterns" />
      </ListItem>
      <ListItem button key="Fabrics" component="a" href="/fabrics">
        <ListItemIcon>
          <ContentCutIcon />
        </ListItemIcon>
        <ListItemText primary="Fabric Stash" />
      </ListItem>
      <ListItem button key="Measurements" component="a" href="/measurements">
        <ListItemIcon>
          <AccessibilityNewIcon />
        </ListItemIcon>
        <ListItemText primary="Measurements" />
      </ListItem>
    </List>
  </div>
);

const drawerWidth = 240;

function Measurements() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [token, , deleteToken] = useCookies(["craftingnexus"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token["craftingnexus"]) navigate("/auth");
  }, [token, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutUser = () => {
    deleteToken(["craftingnexus"]);
  };

  return (
    <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <UIAppBar
      drawerWidth={drawerWidth}
      handleDrawerToggle={handleDrawerToggle}
      logoutUser={logoutUser}
      barLinks={{
        title: "Measurements",
        links: [
          { name: "Main Menu", href: "/app" },
        ],
      }}
    />
    <UINavDrawer
      drawer={drawer}
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      drawerWidth={drawerWidth}
    />
    <UIAppBody drawerWidth={drawerWidth}>
      Content Goes Here
    </UIAppBody>
  </Box>
  );
}

export default Measurements;
