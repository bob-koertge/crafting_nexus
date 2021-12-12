import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import HandymanIcon from "@mui/icons-material/Handyman";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ContentCutIcon from "@mui/icons-material/ContentCut";

import UINavDrawer from "./UI/app_drawers";
import UIAppBar from "./UI/app_bar";
import UIAppBody from "./UI/app_body";

const drawerWidth = 240;

function App(props) {
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

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key="Projects" component="a" href="/projects">
          <ListItemIcon>
            <HandymanIcon />
          </ListItemIcon>
          <ListItemText primary="Projects"/>
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UIAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        logoutUser={logoutUser}
        barLinks={{ title: "Main App" }}
      />
      <UINavDrawer
        drawer={drawer}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <UIAppBody drawerWidth={drawerWidth}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </UIAppBody>
    </Box>
  );
}

export default App;
