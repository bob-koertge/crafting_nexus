import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function UIAppBody(props) {
    return (
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    )
}

export default UIAppBody;