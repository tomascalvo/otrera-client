// hooks

import React, { useState, useEffect } from "react";

// import useStyles from "./Chart.styles";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

// components

import { Line } from "react-chartjs-2";

// api

import { fetchEDB } from "../../../../api/index";

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

  const [EDBmovements, setEDBmovements] = useState([]);

  // useEffect(() => {
  //   const getEDB = async () => {
  //     if (!localStorage.getItem("EDBmovements")) {
  //       const { data: EDBmovements } = await fetchEDB();
  //       localStorage.setItem("EDBmovements", JSON.stringify(EDBmovements));
  //     }
  //     const parsedEDBMovements = JSON.parse(
  //       localStorage.getItem("EDBmovements")
  //     );
  //     setEDBmovements(parsedEDBMovements);
  //   };
  //   getEDB();
  // }, []);

  if (selectedGoal) {
    datasets = [getDataset(selectedGoal, theme.palette.primary.main)];
  } else {
    // console.log(`Chart.component is mapping through goals to get datasets`);
    datasets = sortGoals(goals).map((goal, i) => {
      const colors = ["primary", "secondary", "success", "warning", "info"];
      const color = theme.palette[colors[i % 5]].main;
      return getDataset(goal, color, goals);
    });
    // console.log(`datasets:`);
    // console.dir(datasets);
  }

  const movementName = EDBmovements.find((mvmnt) => {
    return mvmnt.id === selectedGoal?.EDBmovement;
  })?.name;

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
              `${selectedGoal?.resistance} lb ${movementName}`,
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

  // console.log('Chart.component labels: ', labels);
  // console.log('Chart.component datasets: ', datasets);

  return <>{lineChart}</>;
};

export default Chart;
