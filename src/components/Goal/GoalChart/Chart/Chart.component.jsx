import React from "react";

// hooks

import { useTheme } from "@mui/styles";
// import useStyles from "./Chart.styles";
import { useMediaQuery } from "@mui/material";

// components

import { Line } from "react-chartjs-2";

// methods

import { getLabels, sortGoals, getDataset } from "./getChartData";

const Chart = ({ goals, selectedGoal }) => {

  // hooks
  const theme = useTheme();
  // const classes = useStyles();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const labels = selectedGoal
    ? getLabels(selectedGoal)
    : getLabels(goals, isSmDown);

  let datasets;

  if (selectedGoal) {
    datasets = [getDataset(selectedGoal, theme.palette.primary.main)];
  } else {
    datasets = sortGoals(goals).map((goal, i) => {
      const colors = ["primary", "secondary", "success", "warning", "info"];
      const color = theme.palette[colors[i % 5]].main;
      return getDataset(goal, color, goals);
    });
  }

  const lineChart = goals.length ? (
    <Line
      data={{
        labels,
        datasets,
      }}
      options={{
        plugins: {
          legend: {
            display: !selectedGoal && !isSmDown,
            position: "bottom",
            align: "start",
          },
          title: {
            display: selectedGoal,
            text:
              selectedGoal?.title ||
              `${selectedGoal?.resistance} lb ${selectedGoal?.movement?.title}`,
          },
        },
        scales: {
          y: {
            ticks: {
              // include 'lbs' in the ticks
              callback: function (value, index, values) {
                return value + " lbs";
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        // spanGaps: true
      }}
    />
  ) : null;

  return <>{lineChart}</>;
};

export default Chart;
