import React from "react";

// hooks

import { useTheme } from "@mui/styles";
import useStyles from "./GoalChart.styles";

// components

import { Typography } from "@mui/material";
import { Chart, GoalPicker } from "../../index";

const GoalChart = ({ goals = [], selectedGoal = "", setSelectedGoal }) => {
  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // event handlers

  const handleSelectChange = (goalId) => {
    setSelectedGoal(goalId);
  };

  if (Array.isArray(goals) && goals.length > 0) {
    return (
      <div
        className={classes.flexContainer}
        // style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '40vh'}}
      >
        <GoalPicker
          goals={goals}
          selectedGoal={selectedGoal}
          handleSelectChange={handleSelectChange}
          className={classes.goalPicker}
        />
        <div
          className={classes.chartContainer}
          // style={{
          //   flex: '1',
          //   position: 'relative',
          // }}
        >
          <Chart
            goals={goals}
            selectedGoal={goals.find((goal) => goal._id === selectedGoal)}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Typography color="textSecondary" style={{ marginTop: theme.spacing(3) }}>
        No Goals
      </Typography>
    );
  }
};

export default GoalChart;
