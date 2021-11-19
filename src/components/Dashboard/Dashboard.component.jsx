// hooks
import React, { useState, useEffect } from "react";
import useStyles from "./Dashboard.styles";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

import cx from "classnames";

// components
import { Container, Box, Grid, Paper, Typography, Button } from "@mui/material";

import BodyStatusPicker from "../BodyStatusPicker/BodyStatusPicker.component.jsx";
import ListModule from "./ListModule/ListModule.component";
import GoalChart from "../Goal/GoalChart/GoalChart.component";

// api
import {
  // fetchEDB,
  getProgress,
  fetchUpcomingSessions,
  suggestPlans,
  createSession,
} from "../../api/index";

const Dashboard = ({ user }) => {
  // hooks
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // state
  const [progress, setProgress] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [upcomingSessions, setUpcomingSessions] = useState("loading");
  const [status, setStatus] = useState({});
  const [suggestions, setSuggestions] = useState("loading");

  // lifecycle

  // push to signin page if no profile in localStorage

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      history.push("/auth");
    }
  }, [history]);

  // get goals, upcoming sessions from the server based on user

  useEffect(() => {
    const getUpcoming = async () => {
      try {
        const { data: dbSessions } = await fetchUpcomingSessions(user?._id);
        setUpcomingSessions(dbSessions);
      } catch (error) {
        console.log(error);
        setUpcomingSessions([]);
      }
    };
    const fetchProgress = async () => {
      try {
        const { data } = await getProgress(user?._id);
        setProgress(data);
      } catch (error) {
        console.log(error);
        setProgress([]);
      }
    };

    if (user) {
      getUpcoming();
      fetchProgress();
    }
  }, [user]);

  // get suggested plans from the server based on user

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const { data: dbSuggestions } = await suggestPlans();
        if (Array.isArray(dbSuggestions)) {
          setSuggestions(dbSuggestions);
        } else {
          console.log(
            "suggestPlans() has returned a non-array. Setting suggestions to an empty array ([])."
          );
          setSuggestions([]);
        }
      } catch (error) {
        console.log(
          "An error has occurred during useEffect to fetch suggested workouts."
        );
        console.log(error);
        setSuggestions([]);
      }
    };
    if (user) {
      getSuggestions();
    }
  }, [user, status]);

  // event handlers

  return (
    <div className={!isXs ? classes.container : classes.mobileContainer}>
      <Container>
        <Box
        // classNames={classes.heading}
        >
          <Typography
            component="h2"
            variant={useMediaQuery(theme.breakpoints.up("sm")) ? "h2" : "h4"}
            align="center"
            color="textPrimary"
            gutterBottom
            styles={
              {
                // marginBottom: theme.spacing(3)
                // marginBottom: '100px'
              }
            }
          >
            Dashboard
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9} >
            <Paper className={cx(classes.paper, classes.flexPaper)}>
              <Typography component="h3" variant="h5">
                Progress
              </Typography>
              {progress.length > 0 ? (
                <div style={{ height: "100%" }}>
                  <GoalChart
                    goals={progress}
                    selectedGoal={selectedGoal}
                    setSelectedGoal={setSelectedGoal}
                  />
                </div>
              ) : (
                <>
                  <Typography
                    color="textSecondary"
                    style={{ marginTop: theme.spacing(2) }}
                  >
                    Set goals and track your progress.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/goals/create")}
                    style={{ marginTop: theme.spacing(2) }}
                  >
                    Set a Goal
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} >
            <Paper className={cx(
              classes.paper, 
              // classes.flexPaper
              )}>
              <Typography component="h3" variant="h5">
                Upcoming Workouts
              </Typography>
              <ListModule
                array={upcomingSessions}
                model="session"
                label="Upcoming Workouts"
                handleClick={(workout) => {
                  history.push(`/sessions/${workout.id}/perform`);
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} >
            <Paper className={classes.paper}>
              <Typography component="h3" variant="h5">
                Condition
              </Typography>
              <BodyStatusPicker setStatus={setStatus} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9} >
            <Paper className={classes.paper}>
              <Typography component="h3" variant="h5">
                Suggested Workouts
              </Typography>
              <ListModule
                array={suggestions}
                model="plan"
                label="Suggested Workouts"
                handleClick={async (workout) => {
                  console.log(`Suggested Workout list item clicked`);
                  const sessionData = {
                    plan: workout?.id || workout?._id,
                    creator: user._id,
                    invitees: [user._id],
                  };
                  console.log(`Dashboard.components sessionData:`);
                  console.dir(sessionData);
                  try {
                    const {
                      data: { id: newId },
                    } = await createSession(sessionData);
                    history.push(`/sessions/${newId}/perform`);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
