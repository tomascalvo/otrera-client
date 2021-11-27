import React from "react";
import moment from "moment";

// hooks

import { useTheme } from "@mui/styles";
import useStyles from "./SessionsList.styles";

// api

import { deleteSession } from '../../../../api/index';

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
  IconButton
} from "@mui/material";

import {
  Delete as DeleteIcon
} from '@mui/icons-material';

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

  const handleDeleteSession = async (e, sessionId) => {
    e.preventDefault();
    try {
      const { data: deletion } = await deleteSession(sessionId);
      setSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== deletion._id;
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  const SessionListItem = ({ session }) => (
    <ListItem
      // button
      // onClick={() => handleOnClick(session.id)}
      alignItems="flex-start"
      // disableGutters
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteSession(e, session._id)}>
          <DeleteIcon />
        </IconButton>
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
      <ListItemText
        primary={session?.plan?.title}
        secondary={`Start Time: ${moment(session.startTime).format("MM/DD/YY LT")}`}
        onClick={() => handleOnClick(session.id)}
      />
    </ListItem>
  );

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
            <SessionListItem session={session} key={i} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default SessionsList;
