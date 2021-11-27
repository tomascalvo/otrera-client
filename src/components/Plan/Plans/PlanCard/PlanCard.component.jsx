// hooks
import React from "react";
import useStyles from "./PlanCard.styles";
import { useHistory } from "react-router-dom";

// import { Link } from "react-router-dom";

// components
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

// import { Alert } from '@material-ui/lab';

// api
import {
  deletePlan,
  // duplicatePlan,
  fetchRecentSessions,
  // fetchSessionsByPlanAndUser,
  createSession,
} from "../../../../api/index";

const PlanCard = ({
  workout: {
    _id: planId,
    title,
    image,
    creator = { name: "Otrera" },
    description,
  },
  setWorkoutData,
  setOpenAlert,
  setSessions,
}) => {
  // hooks
  const history = useHistory();
  const classes = useStyles();

  // state

  const user = JSON.parse(localStorage.getItem("profile"))?.user;

  // event handlers

  const handleDetails = (e) => {
    e.preventDefault();
    history.push(`/plans/${planId}`);
  };

  const startWorkout = async (e) => {
    e.preventDefault();
    console.log(`PlanCard.component invokes async startWorkout(e).`);
    // search for a session to start. The session must match the plan shown on the PlanCard. The session must have the current user's _id under creator, leader, invitees, or attendees.
    console.log(`PlanCard.component invokes api.fetchRecentSessions(planId=${planId}, user?._id=${user?._id}).`);
    try {
      const { data: existingSessions } = await fetchRecentSessions(
        planId,
        user?._id
      );
      console.log(`existingSessions.length: ${existingSessions.length}`);
      // if there are already sessions scheduled for this plan for this user, create an alert asking the user if they want to perform a scheduled session or perform a new session for this plan
      if (existingSessions.length > 0) {
        setSessions(existingSessions);
        setOpenAlert(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    // if no scheduled session using this plan, (or the user declines to perform any of the scheduled sessions), create a new session
    try {
      const {
        data: { _id: sessionId },
      } = await createSession({
        plan: planId,
        creator: user?._id,
      });
      // navigate to performance page with useHistory hook
      history.push(`/sessions/${sessionId}/perform`);
    } catch (error) {
      console.log(error);
    }
  };

  // render

  if (!planId) {
    return <CircularProgress style={{ margin: "75px auto" }} />

  }

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Card className={classes.card}>
        {image === undefined || image === "" ? (
          <CircularProgress style={{ margin: "75px auto" }} />
        ) : (
          <CardMedia
            className={classes.cardMedia}
            image={image || "https://source.unsplash.com/random"}
            title="Splash image title"
            onClick={handleDetails}
            sx={{ cursor: "pointer" }}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h5"
            onClick={handleDetails}
            sx={{ cursor: "pointer" }}
          >
            {title}
          </Typography>
          {
            creator && (
              <Typography gutterBottom color="textSecondary">
                Created by {creator.name}
              </Typography>
            )
          }
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                fullWidth
                onClick={startWorkout}
              >
                Start
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  // navigate to scheduling form with useHistory hook
                  history.push(`/sessions/create/plan/${planId}`);
                }}
                fullWidth
              >
                Schedule
              </Button>
            </Grid>
          </Grid>
          {/* <Button
            size="small"
            color="inherit"
            component={Link}
            to={`/plans/${planId}`}
          >
            Details
          </Button> */}
          {/* <Button
            size="small"
            color="inherit"
            onClick={async () => {
              try {
                const { data: newPlan } = await duplicatePlan(planId);
                console.log(newPlan);
                setWorkoutData((previous) => {
                  return [...previous, newPlan];
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Duplicate
          </Button> */}
          {creator === user?._id && (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={async () => {
                try {
                  await deletePlan(planId);
                  setWorkoutData((prevData) =>
                    prevData.filter((workout) => workout._id !== planId)
                  );
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlanCard;
