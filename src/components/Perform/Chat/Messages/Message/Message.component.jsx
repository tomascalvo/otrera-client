import React from "react";
import moment from "moment";
import ReactEmoji from 'react-emoji';

// hooks

import useStyles from "./Message.styles";

// components

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

const Message = ({ message, alignment }) => {
  // hooks

  const classes = useStyles();

  return (
    <ListItem
      alignItems="flex-start"
      disableGutters
      className={classes.message}
    >
      {alignment === "left" && (
        <ListItemAvatar>
          <Avatar alt={message.sender?.name} src={message.sender?.image} />
        </ListItemAvatar>
      )}
      <ListItemText
        align={alignment}
        primary={ReactEmoji.emojify(message.text)}
        secondary={`${message.sender.name} ${moment(message.createdAt).format(
          "h:mm a"
        )}`}
      ></ListItemText>
    </ListItem>
  );
};

export default Message;
