// hooks

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from '@mui/styles';
import useStyles from "./SessionForm.styles";
import { useHistory } from "react-router-dom";

// api

import { createSession, fetchPlan } from "../../../api";

// components

import { Paper, Typography, Button } from "@mui/material";
import SchedulingForm from "../../Plan/PlanForm/SchedulingForm/SchedulingForm.component.jsx";

// auth

const user = JSON.parse(localStorage.getItem("profile"))?.user;

const SessionForm = () => {

  console.log(`user:`)
  console.dir(user);

  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);
  let { id: workoutId } = useParams();
  const history = useHistory();

  // state

  const [planData, setPlanData] = useState({});
  const [sessionData, setSessionData] = useState({
      startTime: new Date(),
      invitees: [user],
  });

  // lifecycle

  // fetch workout
  useEffect(() => {
    async function fetchData() {
      const { data: plan } = await fetchPlan(workoutId);
      setPlanData(plan);
    }
    fetchData();
  }, [workoutId]);

  // event handlers

  const handleSubmit = async () => {
    const submission = {
      ...sessionData,
      plan: planData?._id,
      invitees: sessionData?.invitees.map((invitee) => invitee?._id),
      leader: sessionData?.leader?._id,
    };

    await createSession(submission)
      .then(({ data: confirmation }) => {
        console.log("Session saved. New session: ", confirmation);
        history.push(`/sessions`);
      })
      .catch((error) => console.log(error));
  };

  // render
  
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Schedule Workout Session
        </Typography>
        <Typography>Workout: {planData.title}</Typography>
        <SchedulingForm
          planData={planData}
          sessionData={sessionData}
          setSessionData={setSessionData}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          sx={{ margin: `${theme.spacing(2)} 0 ${theme.spacing(3)}` }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </main>
  );
};

export default SessionForm;
