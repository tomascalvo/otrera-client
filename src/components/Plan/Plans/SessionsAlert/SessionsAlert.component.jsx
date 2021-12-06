import React from "react";
import moment from "moment";
import cx from 'classnames';

// hooks

import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./SessionsAlert.styles";

//components

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

// api

import { createSession } from "../../../../api/index";

const user = JSON.parse(localStorage.getItem("profile"))?.user;

const SessionsAlert = ({ sessions, openAlert, setOpenAlert }) => {
  // hooks

  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Dialog
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      aria-labelledby="recent-sessions-exist"
      aria-describedby="The workout plan you have selected already has sessions scheduled. Choose a previous session or create a new one to perform this workout plan."
    >
      <DialogTitle id="sessions-alert-title">
        {"Perform a recent session?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="sessions-alert-text">
          {`Perform a previously-scheduled session for ${sessions[0].plan.title} or start a new session?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {[...sessions]
          .sort((firstEl, secondEl) => {
            return moment(firstEl.startTime).diff(secondEl.startTime);
          })
          .map((session, i) => (
            <Button
              key={i}
              color="inherit"
              variant="outlined"
              size="medium"
              fullWidth
              className={classes.button}
              onClick={() => {
                history.push(`/sessions/${session._id}/perform`);
              }}
            >
              {moment(session.startTime).format("MM/DD/YY")}
              {"\n"}
              {moment(session.startTime).format("LT")}
              {"\n"}
              {session.invitees.length > 0
                ? `${session.invitees.length} Participant(s)`
                : "Solo"}
            </Button>
          ))}
        <Button
          color="primary"
          variant="contained"
          size="medium"
          className={cx(classes.button, classes.newSession)}
          onClick={async () => {
            try {
              const {
                data: { _id: sessionId },
              } = await createSession({
                plan: sessions[0].plan,
                creator: user._id,
              });
              // navigate to performance page with useHistory hook
              history.push(`/sessions/${sessionId}/perform`);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          New Session
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionsAlert;
