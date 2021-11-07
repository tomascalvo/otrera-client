import React from "react";

// hooks

import useStyles from "./Confirmation.styles";
import { useHistory } from "react-router-dom";

// api

import { createSession } from "../../../../api/index";

// components

import { Typography, Button } from "@mui/material";

const Confirmation = ({ plan, isSession, session, handleReset }) => {
  // hooks

  const classes = useStyles();
  const history = useHistory();

  // render

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {plan.title ? plan.title : "New workout"} plan created.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Participants have been notified of your invitations.{" "}
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={async () => {
            if (isSession) {
              history.push(`/sessions/${session._id}/perform`);
            } else {
              await createSession({
                plan: plan._id,
                startTime: new Date(),
              })
                .then(({ data: newSession }) => {
                  console.log("New session created", newSession);
                  history.push(`/sessions/${newSession._id}/perform`);
                })
                .catch((error) => console.log(error));
            }
          }}
        >
          Start Workout{isSession ? " Session" : ""}
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleReset}
        >
          Plan Another Workout
        </Button>
      </div>
    </>
  );
};

export default Confirmation;
