import React, { useEffect, useRef } from "react";

// hooks

import useStyles from "./Messages.styles";

// components

import {
  Typography,
  List,
  Grid,
  Divider,
  TextField,
  Fab,
} from "@mui/material";

import { Send as SendIcon } from "@material-ui/icons";

import Message from './Message/Message.component';

const Messages = ({
  userId,
  participants,
  messages,
  composition,
  setComposition,
  handleSubmitMessage,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // hooks

  const classes = useStyles();

  // event handlers

  const handleTyping = (e) => {
    e.preventDefault();
    setComposition(e.target.value);
  };

  const handleReturn = (e) => {
    if (e.keyCode === 13) {
      handleSubmitMessage(e);
    }
  };

  // render

  if (messages === "loading") {
    return <Typography>Loading messages...</Typography>;
  } else if (Array.isArray(messages)) {
    return (
      <>
        <div className={classes.container}>
      <Divider />

          <div className={classes.messageArea}>
            <List 
              // disablePadding
            >
              {messages.map((message, i) => {
                const alignment =
                  message.sender._id === userId ? "right" : "left";
                return (
                  <Message message={message} alignment={alignment} key={i} className={classes.message}/>
                );
              })}

              <div ref={messagesEndRef} />
            </List>
          </div>
          <Divider />
          <div className={classes.composition}>
            <Grid container>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Send Message"
                  value={composition}
                  onChange={handleTyping}
                  onKeyDown={handleReturn}
                  inputProps={{
                    autoComplete: "off",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  // fullWidth
                  className={classes.messageInput}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="send"
                  onClick={handleSubmitMessage}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Messages;
