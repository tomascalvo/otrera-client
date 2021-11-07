import React from "react";

// hooks

import useStyles from "./ChatDialog.styles";
import { useTheme } from '@mui/styles';
import { useMediaQuery} from '@mui/material';


// components

import { Typography, Dialog, IconButton, Divider } from "@mui/material";

import { KeyboardArrowLeft } from "@material-ui/icons";

import Chat from "../Chat.component";

const ChatDialog = ({
  user,
  participants,
  chatters,
  setChatters,
  messages,
  composition,
  setComposition,
  handleSubmitMessage,
  open,
  handleClose,
}) => {
  // hooks

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="chat dialog"
      className={classes.dialog}
    >
      <IconButton
        onClick={handleClose}
        className={classes.backButton}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography variant="h4" align="center" className={classes.heading}>
        Chat
      </Typography>
      <Divider />
      <div className={classes.chatContainer}>
        <Chat
          user={user}
          participants={participants}
          messages={messages}
          composition={composition}
          setComposition={setComposition}
          handleSubmitMessage={handleSubmitMessage}
        />
      </div>
    </Dialog>
  );
};

export default ChatDialog;
