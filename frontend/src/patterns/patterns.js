import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { API } from "../api-service";
import PatternGrid from "./pattern_grid";
import PatternDetails from "./pattern_detail";
import PatternForm from "./pattern_form";
import PatternTreeView from "./pattern_tree_view";
import UINavDrawer from "../UI/app_drawers";
import UIAppBar from "../UI/app_bar";
import UIAppBody from "../UI/app_body";

const drawerWidth = 240;

function Patterns() {
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
      <UIAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        logoutUser={logoutUser}
        barLinks={{
          title: "Sewing Patterns",
          links: [
            { name: "Main Menu", href: "/app" },
            { name: "View all Patterns", href: "/patterns" },
          ],
        }}
      />
      <UINavDrawer
        drawer={drawer}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <UIAppBody drawerWidth={drawerWidth} >
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
      </UIAppBody>
    </Box>
  );
}

export default Patterns;
