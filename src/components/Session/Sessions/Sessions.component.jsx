// hooks

import React, { useState, useEffect } from "react";
import useStyles from "./Sessions.styles";

// components

import { Container, Typography } from "@mui/material";

import SessionsList from "./SessionsList/SessionsList.component";

// api

import { fetchUpcomingSessions } from "../../../api/index";

const Sessions = () => {
  // hooks

  const classes = useStyles();

  // state

  const user = JSON.parse(localStorage.getItem("profile"))?.user;
  const [sessions, setSessions] = useState("loading");

  // lifecycle

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Sessions.component invokes api.fetchUpcomingSessions(user._id=${user._id})`);
      const { data: payload } = await fetchUpcomingSessions(user._id);
      console.log(`fetchUpcomingSessions payload:`);
      console.dir(payload);
      setSessions(payload);
    };
    fetchData();
  }, [user]);

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Upcoming Workouts
        </Typography>
        <Typography>View scheduled workouts here.</Typography>
      </Container>
      <SessionsList sessions={sessions} />
    </div>
  );
};

export default Sessions;
