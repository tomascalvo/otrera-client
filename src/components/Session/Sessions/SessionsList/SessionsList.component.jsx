import React from "react";

import moment from "moment";

// hooks

import { useHistory } from "react-router-dom";

// components

import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";

const SessionsList = ({ sessions = "loading" }) => {
  // hooks

  const history = useHistory();

  // event handlers

  const handleClick = (sessionId) => {
    history.push(`/sessions/${sessionId}/perform`);
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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography>You have no workout sessions scheduled in the future.</Typography>
          </Grid>
        </Grid>
      ) : (
        <List aria-label="workout sessions">
          {sessions.map((session, i) => (
            <ListItem
              button
              onClick={() => handleClick(session.id)}
              key={i}
              alignItems="flex-start"
              disableGutters
            >
              <ListItemAvatar>
                <Avatar alt="workout" src={session.plan.image} />
              </ListItemAvatar>
              <ListItemText
                primary={session.plan.title}
                secondary={`${moment(session.startTime).format("MM/DD/YY LT")}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SessionsList;
