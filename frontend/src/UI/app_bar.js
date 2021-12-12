import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function UIAppBar(props) {
  const { drawerWidth, handleDrawerToggle, logoutUser, barLinks } = props;

  return (
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
          {barLinks.title}
        </Typography>
        {barLinks.links
          ? barLinks.links.map((link) => (
              <Button color="inherit" component="a" href={link.href}>
                {link.name}
              </Button>
            ))
          : null}

        <Button color="inherit" onClick={logoutUser}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default UIAppBar;
