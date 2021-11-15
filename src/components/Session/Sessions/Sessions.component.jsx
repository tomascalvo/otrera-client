// hooks

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Sessions.styles";

// components

import { Container, Typography, Stack, Box, Button } from "@mui/material";

import SessionsList from "./SessionsList/SessionsList.component";

// api

import {
  fetchPreviousSessions,
  fetchUpcomingSessions,
} from "../../../api/index";

const Sessions = () => {
  // hooks
  const history = useHistory();
  const classes = useStyles();

  // state
  const user = JSON.parse(localStorage.getItem("profile"))?.user;
  const [previousSessions, setPreviousSessions] = useState("loading");
  const [upcomingSessions, setUpcomingSessions] = useState("loading");

  // lifecycle

  useEffect(() => {
    const fetchPrevious = async () => {
      console.log(
        `Sessions.component invokes api.fetchPreviousSessions(user._id=${user._id})`
      );
      try {
        const { data: payload } = await fetchPreviousSessions(user._id);
        console.log(`fetchUpcomingSessions payload:`);
        console.dir(payload);
        setPreviousSessions(payload);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUpcoming = async () => {
      console.log(
        `Sessions.component invokes api.fetchUpcomingSessions(user._id=${user._id})`
      );
      try {
        const { data: payload } = await fetchUpcomingSessions(user._id);
        console.log(`fetchUpcomingSessions payload:`);
        console.dir(payload);
        setUpcomingSessions(payload);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrevious();
    fetchUpcoming();
  }, [user._id]);

  // event handlers

  const handlePerformSession = (sessionId) => {
    history.push(`/sessions/${sessionId}/perform`);
  };

  const handleViewSessionDetails = (sessionId) => {
    history.push(`/sessions/${sessionId}`);
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Sessions
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          View previous workouts and upcoming workouts.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {upcomingSessions.length > 0 && (
            <Button
              variant="contained"
              onClick={() => {
                history.push(
                  `/sessions/${upcomingSessions[0].sessionId}/perform`
                );
              }}
            >
              Perform next scheduled workout
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => {
              history.push(`/plans`);
            }}
          >
            Schedule new workout
          </Button>
        </Stack>
      </Container>
      <Container>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Box>
            <Typography variant="h4">Upcoming Workout Sessions</Typography>
            <SessionsList
              sessions={upcomingSessions}
              handleOnClick={handlePerformSession}
            />
          </Box>
          <Box>
            <Typography variant="h4">Previous Workout Sessions</Typography>
            <SessionsList
              sessions={previousSessions}
              handleOnClick={handleViewSessionDetails}
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Sessions;
