import React from "react";

// hooks
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import useStyles from "./Profile.styles";

// components
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import {
  Brightness3 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  PersonAdd,
  Settings,
  Logout,
} from "@mui/icons-material";

const Profile = ({ handleDarkModeToggle, user, handleLogout }) => {
  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  // state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // event handlers
  const handleClickAccountSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // render
  return (
    <div className={classes.profile}>
      <Tooltip title="Account Settings">
        <IconButton
          onClick={handleClickAccountSettings}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar alt={user?.name} src={user?.image}>
            {user.name.split(" ").map((word) => word.charAt(0))}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}
        <MenuItem
          aria-label="toggle dark mode" 
          onClick={handleDarkModeToggle}
        >
          <ListItemIcon>
          {theme.palette.mode !== "dark" ? (
          <DarkModeIcon fontSize="small"/>
        ) : (
          <LightModeIcon fontSize="small"/>
        )}
          </ListItemIcon>
          {theme.palette.mode !== "dark" ? "Dark" : "Light"} mode
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {!isXs && (
        <>
          <Typography
            className={classes.userName}
            variant="h6"
            style={{ marginRight: 20, marginLeft: 20, whiteSpace: "nowrap" }}
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
        </>
      )}
    </div>
  );
};

export default Profile;
