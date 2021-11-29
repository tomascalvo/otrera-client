import React from "react";
import moment from "moment";

// components

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const SessionsListItem = ({
  session,
  handleDeclineInvite,
  handleDeleteSession,
  classes,
  handleOnClick,
}) => {
  const inviteeString = `Invitees: ${session.invitees
    .map((invitee) => {
      if (
        invitee._id === JSON.parse(localStorage.getItem("profile")).user._id
      ) {
        return "me";
      }
      return invitee.name;
    })
    .join(", ")}`;

  return (
    <ListItem
      // button
      // onClick={() => handleOnClick(session.id)}
      alignItems="flex-start"
      // disableGutters
      secondaryAction={
        <>
          <Tooltip title="decline invitation">
            <IconButton
              edge="end"
              aria-label="decline invitation"
              onClick={(e) => handleDeclineInvite(e, session._id)}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete session">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => handleDeleteSession(e, session._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar
          alt="workout"
          src={session?.plan?.image}
          className={
            session?.plan?.image.includes("d205bpvrqc9yn1.cloudfront.net")
              ? classes.gifUrl
              : ""
          }
          onClick={() => handleOnClick(session.id)}
        />
      </ListItemAvatar>
      <div>
        <ListItemText
          primary={session?.plan?.title}
          secondary={`Start Time: ${moment(session.startTime).format(
            "MM/DD/YY LT"
          )}`}
          onClick={() => handleOnClick(session.id)}
        />
        <ListItemText
          // primary={"Invitees"}
          secondary={inviteeString}
          onClick={() => handleOnClick(session.id)}
        />
      </div>
    </ListItem>
  );
};

export default SessionsListItem;
