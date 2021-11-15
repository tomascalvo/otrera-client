import React from "react";
import moment from "moment";
import cx from "classnames";

// hooks

import { useHistory } from 'react-router-dom';
import { useTheme } from "@mui/styles";
import useStyles from "./DoughnutCards.styles";

// components

import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography, Grid, Button, IconButton, Box, Tooltip } from "@mui/material";
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import CountUp from "react-countup";

// API

import { deleteGoal, createSingleMovementSession } from '../../../../api/index';

const DoughnutChartCard = ({
  goal: {
    _id: id,
    movement = undefined,
    EDBmovement = undefined,
    resistance,
    reps,
    title = undefined,
    createdAt: startDate,
    finish: deadline,
    sets = [],
  },
  selectedGoal,
  setSelectedGoal,
  setGoals,
}) => {
  let pr;
  if (sets.length > 0) {
    pr = sets.reduce(function (prev, current) {
      return prev.resistance > current.resistance ? prev : current;
    });
  }

  // hooks

  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();

  const now = moment();
  const dLine = moment(deadline);
  const urgency =
    pr?.resistance >= resistance
      ? "achieved"
      : now.isAfter(dLine)
      ? "failed"
      : now.isAfter(dLine.subtract(7, "days"))
      ? "urgent"
      : now.isAfter(dLine.subtract(1, "days"))
      ? "critical"
      : "";

  // event handlers

  const handleClick = (e) => {
    // e.preventDefault();
    setSelectedGoal(id);
  };

  const handleAttempt = async (e) => {
    e.preventDefault();
    console.log('handleAttempt invoked');
    try {
      // invoke api method to create a new plan with just this movement and a new session with this plan and just the current user as invitee
      const { data: { _id: sessionId }} = await createSingleMovementSession(movement?._id || EDBmovement?.id);
      // navigate to performance page with useHistory hook
      history.push(`/sessions/${sessionId}/perform`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteGoal = async (goalId) => {
    console.log(`deleteGoal event handler called for id: ${goalId}`)
    try {
      await deleteGoal(goalId);
      setGoals((previous) => 
        previous.filter((goal) => goal._id !== goalId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs={6} sm={4} md={3} xl={3}>
      <Card
        className={cx(classes.card, classes[urgency])}
        onClick={handleClick}
      >
        <CardContent>
          <Doughnut
            style={{ marginBottom: theme.spacing(2) }}
            data={{
              labels: ["Time", "Resistance"],
              datasets: [
                {
                  label: "Time",
                  data: [
                    // Math.abs(moment().diff(moment(startDate), "days")),
                    // Math.abs(moment(deadline).diff(moment(), "days")),
                    moment().diff(moment(startDate), "days"),
                    moment(deadline).diff(moment(), "days"),
                  ],
                  backgroundColor: [
                    // "#ff0000",
                    theme.palette.background.paper,
                    selectedGoal === id
                      ? theme.palette.secondary.main
                      : theme.palette.secondary.dark,
                  ],
                  hoverOffset: 4,
                  borderWidth: 0,
                  weight: 1,
                },
                {
                  label: "Resistance",
                  data: [pr?.resistance, (resistance - pr?.resistance) > 0 ? resistance - pr?.resistance : 0],
                  backgroundColor: [
                    selectedGoal === id
                      ? theme.palette.info.main
                      : theme.palette.info.dark,
                    theme.palette.background.paper,
                  ],
                  hoverOffset: 4,
                  borderWidth: 0,
                  weight: 5,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    label: function (context) {
                      const timeLabel = `${context.parsed} Days ${
                        context.dataIndex === 0 ? "Elapsed" : "Remaining"
                      }`;
                      const resistanceLabel = `${
                        context.dataIndex === 0
                          ? "PR: " + context.parsed
                          : "Goal: " +
                            (context.dataset.data[0] + context.dataset.data[1])
                      } lbs`;
                      if (context.dataset.label === "Resistance") {
                        return resistanceLabel;
                      } else if (context.dataset.label === "Time") {
                        return timeLabel;
                      } else {
                        return "";
                      }
                    },
                  },
                },
              },
            }}
          />
          <Typography color="textSecondary" gutterBottom>
            {EDBmovement?.name}
          </Typography>
          <Typography variant="h5">
            {resistance} lbs
            {reps > 1 && ` / ${reps} reps`}
          </Typography>
          <Typography color="textSecondary">
            by {moment(deadline).format("MM/DD/YY")}
          </Typography>
          {pr && (
            <Typography variant="body2">
              PR:{" "}
              <CountUp
                start={0}
                end={pr?.resistance ?? 0}
                duration={1}
                separator=","
              />{" "}
              lbs, {moment(pr?.completed).format("MM/DD/YY")}
            </Typography>
          )
        }
        <Box
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <Button 
              variant="contained" 
              // fullWidth 
              style={{ margin: `${theme.spacing(1)} 0`, flexGrow: 1}} 
              onClick={handleAttempt}
            >
              Attempt
            </Button>
        <Tooltip
          title="Quit goal"
        >
          <IconButton variant="contained" color="inherit" size="large" style={{ flexShrink: 0 }} onClick={() => handleDeleteGoal(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const DoughnutCards = ({ goals, selectedGoal, setSelectedGoal, setGoals }) => {
  // hooks

  const classes = useStyles();

  // state

  return (
    <div className={classes.container}>
      <Grid
        container
        spacing={2}
        // justifyContent="center"
      >
        {goals
          .sort((a, b) => {
            return moment(a.createdAt).isBefore(moment(b.createdAt));
          })
          .map((goal, i) => (
            <DoughnutChartCard
              goal={goal}
              key={i}
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
              setGoals={setGoals}
            />
          ))}
      </Grid>
    </div>
  );
};

export default DoughnutCards;
