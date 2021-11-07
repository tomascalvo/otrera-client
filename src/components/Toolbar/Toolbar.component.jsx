// hooks

import React from // useState, useEffect
"react";
import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./Toolbar.styles";
// import { useDispatch } from "react-redux";

// components

import Drawer from "./Drawer/Drawer.component";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";

import {
  FitnessCenter as BarbellIcon,
  Menu as MenuIcon,
  Brightness3 as Brightness3Icon,
  Brightness7 as Brightness7Icon,
} from "@material-ui/icons";

const ToolbarComponent = ({ user, handleLogout, handleDarkModeToggle }) => {
  // hooks

  const classes = useStyles();
  const history = useHistory();
  // const dispatch = useDispatch();
  const theme = useTheme();

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
      style={{ flexDirection: "row" }}
      className={classes.appBar}
    >
      <div className={classes.brandContainer}>
        <IconButton
          size="large"
          edge="start"
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
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <IconButton
              aria-label="toggle dark mode"
              onClick={handleDarkModeToggle}
            >
              {theme.palette.mode !== "dark" ? (
                <Brightness3Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
            <Avatar alt={user?.name} src={user?.image}>
              {user.name.split(" ").map((word) => word.charAt(0))}
            </Avatar>
            <Typography
              className={classes.userName}
              variant="h6"
              style={{ marginRight: 20, marginLeft: 20 }}
            >
              {user.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              className={classes.logout}
            >
              Log out
            </Button>
          </div>
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
