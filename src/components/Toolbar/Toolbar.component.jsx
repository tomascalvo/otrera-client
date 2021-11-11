import React from "react";

// hooks

import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./Toolbar.styles";
// import { useDispatch } from "react-redux";

// components

import Drawer from "./Drawer/Drawer.component";
import Profile from "./Profile/Profile.component";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

import {
  FitnessCenter as BarbellIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";

const ToolbarComponent = ({ user, handleLogout, handleDarkModeToggle }) => {
  // hooks

  // const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // lifecycle

  // methods

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      enableColorOnDark={true}
      // className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          size="large"
          // edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          className={classes.menuButton}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          toggleDrawer={toggleDrawer}
        />
        <div className={classes.brandContainer}>
          <div className={classes.title}>
            <Typography
              variant="h6"
              color="inherit"
              component={Link}
              to={"/"}
              style={{ textDecoration: "none" }}
            >
              Otrera
              <BarbellIcon className={classes.icon} />
            </Typography>
          </div>
        </div>
        {user ? (
          <Profile
            user={user}
            handleDarkModeToggle={handleDarkModeToggle}
            handleLogout={handleLogout}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              history.push("/auth");
            }}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
