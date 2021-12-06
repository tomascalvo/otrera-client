import React from "react";

// hooks

import { useTheme } from "@mui/styles";
import useStyles from "./SessionsList.styles";

// api

import { deleteSession, declineInvitation } from "../../../../api/index";

// components

import {
  Container,
  List,
  Grid,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";

import SessionsListItem from "./SessionsListItem/SessionsListItem.component";

const SessionsList = ({
  sessions = "loading",
  setSessions,
  handleOnClick = {
    function() {
      console.log("SessionsList ListItem clicked");
    },
  },
}) => {

  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);

  // event handlers

  const handleDeclineInvite = async (e, sessionId) => {
    e.preventDefault();
    console.log('handleDeclineInvite invoked');
    try {
      const { data: confirmation } = await declineInvitation(sessionId);
      setSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== confirmation._id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.preventDefault();
    try {
      const { data: deletion } = await deleteSession(sessionId);
      setSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== deletion._id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // render

  if (sessions === "loading") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <CircularProgress style={{ margin: "150px auto" }} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Container style={{ padding: 0 }} maxWidth="md">
      {sessions.length < 1 ? (
        <Typography sx={{ m: `${theme.spacing(1)} 0` }}>
          No sessions.
        </Typography>
      ) : (
        <List aria-label="workout sessions">
          {sessions.map((session, i) => (
            <div key={i}>
              <SessionsListItem
                // key={i}
                session={session}
                handleDeclineInvite={handleDeclineInvite}
                handleDeleteSession={handleDeleteSession}
                handleOnClick={handleOnClick}
                classes={classes}
              />
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SessionsList;
