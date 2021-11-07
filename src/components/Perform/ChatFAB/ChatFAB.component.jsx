import React from "react";

import useStyles from "./ChatFAB.styles";

import { Fab } from "@mui/material";
import { Chat as ChatIcon } from "@material-ui/icons";

const ChatFAB = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      onClick={onClick}
      className={classes.fab}
      color="primary"
      aria-label="chat"
    >
      <ChatIcon />
    </Fab>
  );
};

export default ChatFAB;
