import React  from "react";
import cx from "classnames";

// hooks

import useStyles from "./Chat.styles";

// components

import { Grid, Typography, Divider, Hidden } from "@mui/material";

import Participants from "./Participants/Participants.components";
import Messages from "./Messages/Messages.components";

const Chat = ({
  user,
  participants,
  messages,
  composition,
  setComposition,
  handleSubmitMessage,
}) => {

  // hooks

  const classes = useStyles();

  // render

  return (
    <Grid container spacing={1} className={classes.container}>
      <Grid item xs={12} md={12} lg={6} className={cx(classes.borderLeft)}>
        <div className={classes.paddingLeft}>
          <Typography variant="h5">Participants</Typography>
          <Participants userId={user._id} participants={participants} />
        </div>
      </Grid>
      <Hidden lgUp>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={12} lg={6} className={cx(classes.borderLeft)}>
        <div className={cx(classes.borderTop)}>
          <Typography variant="h5" className={classes.paddingLeft}>Messages</Typography>
          <Messages
            userId={user._id}
            participants={participants}
            messages={messages}
            composition={composition}
            setComposition={setComposition}
            handleSubmitMessage={handleSubmitMessage}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Chat;
