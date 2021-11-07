import React from "react";

// hooks

import { useTheme } from "@mui/styles";
import useStyles from "./Participants.styles.js";

// components

import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

const ParticipantLi = ({ participant }) => {
  const theme = useTheme();

  return (
    <>
      <ListItem
        disableGutters
        dense={useMediaQuery(theme.breakpoints.up("md"))}
        button
      >
        <ListItemAvatar>
          <Avatar alt={participant?.name} src={participant?.image} />
        </ListItemAvatar>
        <ListItemText primary={participant?.name} />
        <ListItemText
          align="right"
          primary={
            !participant.isOnline
            ? ""
            : `step ${participant?.step?.index}: `
          }
          secondary={
            !participant.isOnline
              ? "offline"
              : participant?.step
              ? participant?.step?.name
              : "online"
          }
        />
      </ListItem>
    </>
  );
};

const Participants = ({ userId, participants }) => {
  // hooks

  const classes = useStyles();

  if (participants === "loading") {
    return <Typography>Loading Participants...</Typography>;
  } else if (Array.isArray(participants)) {
    if (participants.length === 0) {
      return <Typography>This workout has no participants.</Typography>;
    } else {
      // const user = participants.find((participant) => {
      //   return participant?._id === userId;
      // });
      const others = participants.filter((participant) => {
        return participant?.id !== userId;
      });
      return (
        <>
          {/* <ParticipantLi participant={user} />
          <Divider />
          <TextField id="outlined-basic-email" label="Search Participants" variant="outlined" fullWidth />
          <Divider /> */}
          <List
            // disablePadding
            className={classes.participantArea}
          >
            {others.map((participant, i) => {
              // const isOnline = Math.floor(Math.random() > 0.3) ? true : false;
              return <ParticipantLi participant={participant} key={i} />;
            })}
          </List>
        </>
      );
    }
  } else {
    <Typography>An error has occurred.</Typography>;
  }
};

export default Participants;
