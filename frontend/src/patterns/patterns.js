import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { API } from "../api-service";
import PatternGrid from "./pattern_grid";
import PatternDetails from "./pattern_detail";
import PatternForm from "./pattern_form";
import PatternTreeView from "./pattern_tree_view";
import UIDrawer from "../UI/app_drawers";

const drawerWidth = 240;

function Patterns(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isDetailView, setIsDetailView] = useState(false);
  const [isFormView, setIsFormView] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const [token, , deleteToken] = useCookies(["craftingnexus"]);

  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    API.loadPatterns(token["craftingnexus"])
      .then((resp) => setPatterns(resp))
      .catch((error) => console.log(error));
    API.loadCategories(token["craftingnexus"])
      .then((resp) => setCategories(resp))
      .catch((error) => console.log(error));
    API.loadSizes(token["craftingnexus"])
      .then((resp) => setSizes(resp))
      .catch((error) => console.log(error));
    API.loadPublishers(token["craftingnexus"])
      .then((resp) => setPublishers(resp))
      .catch((error) => console.log(error));
  }, [token]);

  useEffect(() => {
    if (!token["craftingnexus"]) navigate("/auth");
  }, [token, navigate]);

  const handleDetailView = () => {
    setIsDetailView(true);
    setIsFormView(false);
    setIsGridView(false);
  };

  const handleFormView = () => {
    setIsFormView(true);
    setIsDetailView(false);
    setIsGridView(false);
  };

  const handleGridView = () => {
    setIsGridView(true);
    setIsDetailView(false);
    setIsFormView(false);
  };

  const logoutUser = () => {
    deleteToken(["craftingnexus"]);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clickedPattern = (pattern) => {
    setSelectedPattern(pattern);
    handleDetailView();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Button color="primary" onClick={handleFormView}>
        <AddIcon />
        Add A New Pattern
      </Button>
      <PatternTreeView
        clickedPattern={clickedPattern}
        patterns={patterns}
        sizes={sizes}
        categories={categories}
      />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Patterns
          </Typography>
          <Button color="inherit" component="a" href="/app">
            Main Menu
          </Button>
          {isDetailView ? (
            <Button color="inherit" onClick={handleGridView}>
              View all Patterns
            </Button>
          ) : null}

          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <UIDrawer
        drawer={drawer}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {isFormView ? (
          <PatternForm
            publishers={publishers}
            sizes={sizes}
            categories={categories}
          />
        ) : null}
        {isDetailView ? <PatternDetails pattern={selectedPattern} /> : null}
        {isGridView ? (
          <PatternGrid
            patterns={patterns}
            toggleDetailView={handleDetailView}
            patternClicked={clickedPattern}
          />
        ) : null}
      </Box>
    </Box>
  );
}

export default Patterns;
