import React from "react";

import { Link } from "react-router-dom";

import clsx from "clsx";

import useStyles from "./Drawer.styles";

import {
  Drawer as MUIDrawer,
  List,
  // Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Mail as MailIcon,
  AccessibilityNew as BodyIcon,
  Assignment as ClipboardIcon,
  FitnessCenter as DumbbellIcon,
  PhoneAndroid as PhoneIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon
} from "@mui/icons-material";

const Drawer = ({ anchor, open, toggleDrawer }) => {
  const classes = useStyles();

  const getIcon = (icon) => {
    switch (icon) {
      case "DASHBOARD":
        return <DashboardIcon />;
      case "BODYSTATUS":
        return <BodyIcon />;
      case "WORKOUTPLANS":
        return <ClipboardIcon />;
      case "WORKOUTSESSIONS":
        return <PhoneIcon />;
      case "EXERCISES":
        return <DumbbellIcon />;
      case "CALENDAR":
        return <CalendarIcon />;
      case "GOALS":
        return <TimelineIcon />;
      case "CONNECTIONS":
        return <PeopleIcon />;
      default:
        return <MailIcon />;
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { title: "Dashboard", route: "/dashboard", icon: "DASHBOARD" },
          { title: "Status", route: "/status", icon: "BODYSTATUS" },
          { title: "Goals", route: "/goals", icon: "GOALS" },
          { title: "Sessions", route: "/sessions", icon: "CALENDAR" },
          { title: "Workouts", route: "/plans", icon: "WORKOUTPLANS" },
          { title: "Exercises", route: "/movements", icon: "EXERCISES" },
          { title: "Connections", route: "/connections", icon: "CONNECTIONS" },
        ]
        .filter((link) => {
          const hiddenLinks = [
            "Dashboard", "Status", "Goals", "Sessions", "Connections",
          ]
          return localStorage.getItem("profile") ? true : !hiddenLinks.includes(link.title);
        }).map(({ title, route, icon }, index) => (
          <ListItem button key={index} component={Link} to={route}>
            <ListItemIcon>{getIcon(icon)}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <>
      <MUIDrawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </MUIDrawer>
    </>
  );
};

export default Drawer;
