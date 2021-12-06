// hooks

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Sessions.styles";

// components

import { Container, Typography, Grid, Stack, Box, Button } from "@mui/material";
import Header from "../../Header/Header.component";
import SessionsList from "./SessionsList/SessionsList.component";

// api

import {
  fetchPreviousSessions,
  fetchUpcomingSessions,
  deleteSession, declineInvitation
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

  const handleDeclineInvite = async (e, sessionId) => {
    e.preventDefault();
    console.log('handleDeclineInvite invoked');
    try {
      const { data: confirmation } = await declineInvitation(sessionId);
      setPreviousSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== confirmation._id;
        });
      });
      setUpcomingSessions((previous) => {
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
      setPreviousSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== deletion._id;
        });
      });
      setUpcomingSessions((previous) => {
        return previous.filter((el) => {
          return el._id !== deletion._id;
        });
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* <div className={classes.container}> */}
      <Header
        title="Sessions"
        subheading="View previous and upcoming workouts."
      />
      <Container maxWidth="sm">
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
                history.push(`/sessions/${upcomingSessions[0]._id}/perform`);
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
        <Grid
          container
          sx={{ pt: 4 }}
          // direction="row"
          spacing={4}
          // justifyContent="center"
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Upcoming Workout Sessions</Typography>
            <SessionsList
              sessions={upcomingSessions}
              handleDeleteSession={handleDeleteSession}
              handleDeclineInvite={handleDeclineInvite}
              handleOnClick={handlePerformSession}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Previous Workout Sessions</Typography>
            <SessionsList
              sessions={previousSessions}
              handleDeleteSession={handleDeleteSession}
              handleDeclineInvite={handleDeclineInvite}
              handleOnClick={handleViewSessionDetails}
            />
          </Grid>
        </Grid>
      </Container>
    {/* </div> */}
    </>
  );
};

export default Sessions;
