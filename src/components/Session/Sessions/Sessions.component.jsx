// hooks

import React, { useState, useEffect } from "react";
import useStyles from "./Sessions.styles";

// components

import { Container, Typography } from "@mui/material";

import SessionsList from "./SessionsList/SessionsList.component";

// api

import { fetchPreviousSessions, fetchUpcomingSessions } from "../../../api/index";

const Sessions = () => {
  
  // hooks
  const classes = useStyles();

  // state
  const user = JSON.parse(localStorage.getItem("profile"))?.user;
  const [previousSessions, setPreviousSessions] = useState("loading");
  const [upcomingSessions, setUpcomingSessions] = useState("loading");

  // lifecycle

  useEffect(() => {
    const fetchPrevious = async () => {
      console.log(`Sessions.component invokes api.fetchPreviousSessions(user._id=${user._id})`);
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
      console.log(`Sessions.component invokes api.fetchUpcomingSessions(user._id=${user._id})`);
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

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Sessions
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
        >View previous workouts and upcoming workouts.</Typography>
      </Container>
      <Typography>
        Upcoming Workout Sessions
      </Typography>
      <SessionsList sessions={upcomingSessions} />
      <Typography>
        Previous Workout Sessions
      </Typography>
      <SessionsList sessions={previousSessions} />
    </div>
  );
};

export default Sessions;
