// hooks

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Goals.styles";

// components

import { Container, Typography, Button } from "@mui/material";

import { DoughnutCards, GoalChart } from "../../index";

// api

import { getProgress } from "../../../api/index";

// localStorage

// const userId = JSON.parse(localStorage.getItem("profile"))?.user?._id;
// const EDBmovements = JSON.parse(localStorage.getItem("EDBmovements"));

const Goals = () => {
  
  // hooks

  const history = useHistory();
  const classes = useStyles();

  // state

  const [progress, setProgress] = useState("loading");
  const [selectedGoal, setSelectedGoal] = useState("");

  // lifecycle

  useEffect(() => {
    async function fetchData() {
      const { data: myProgress } = await getProgress();
      console.log("myProgress: ", myProgress);
      setProgress(myProgress);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Progress
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Set goals and see your progress displayed as a chart. Goals require
            your choice of movement and indicators: resistance, reps, or both.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => history.push("/goals/create")}
          >
            Create Goal
          </Button>
        </Container>
      </div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {progress === "loading" ? (
          <Typography>Loading goals and progress...</Typography>
        ) : (
          <>
            <GoalChart
              goals={progress}
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
            <DoughnutCards
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
              goals={progress}
              setGoals={setProgress}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Goals;
