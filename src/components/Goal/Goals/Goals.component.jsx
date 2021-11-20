// hooks

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Goals.styles";

// components

import { Container, Typography, Button } from "@mui/material";

import Header from '../../Header/Header.component';
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
      <Header title="Progress" subheading="            Set goals and see your progress displayed as a chart. Goals require
            your choice of movement and indicators: resistance, reps, or both."
      />
      <div className={classes.container}>
        <Container maxWidth="sm">
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
