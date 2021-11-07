import React from "react";

import { useTheme } from "@mui/styles";
import { useHistory } from "react-router-dom";

import moment from "moment";

// components

import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

// api

// import { createSession } from "../../../api";

const UpcomingSession = ({ session }) => (
  <>
    <ListItemAvatar>
      <Avatar alt="upcoming workout session" src={session.plan?.image} />
    </ListItemAvatar>
    <ListItemText
      primary={session.plan?.title}
      secondary={`${moment(session.startTime).format("MM/DD/YY H:mm A")}`}
    />
  </>
);

const SuggestedWorkout = ({ plan }) => (
  <>
    <ListItemAvatar>
      <Avatar alt="suggested workout" src={plan?.image} />
    </ListItemAvatar>
    <ListItemText
      primary={plan?.title}
      secondary={`${plan?.exercises
        ?.map((exercise, i) => {
          const title = exercise?.movement?.title || exercise.EDBmovement.name;
          return i === 0
            ? title.charAt(0).toUpperCase() + title.slice(1)
            : title;
        })
        .join(", ")}.`}
    />
  </>
);

const ListModule = ({ array = [], model, label = "list", handleClick }) => {
  // hooks

  const theme = useTheme();
  const history = useHistory();

  return (
    <Container style={{ padding: 0 }} maxWidth="md">
      {array === "loading" ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <CircularProgress style={{ margin: "150px auto" }} />
          </Grid>
        </Grid>
      ) : Array.isArray(array) && array.length > 0 ? (
        <List aria-label={label}>
          {array.map((workout, i) => {
            // console.log(`ListModule.component workout:`);
            // console.dir(workout);
            return (
              <ListItem
                button
                onClick={() => handleClick(workout)}
                key={i}
                alignItems="flex-start"
                disableGutters
              >
                {model === "plan" ? (
                  <SuggestedWorkout plan={workout} />
                ) : (
                  <UpcomingSession session={workout} />
                )}
              </ListItem>
            )
          }
          )}
        </List>
      ) : (
        <>
          <Typography
            color="textSecondary"
            style={{ marginTop: theme.spacing(2) }}
          >
            No {label.toLowerCase()}.
          </Typography>
          {model === "plan" ? (
            <Button
              variant="contained"
              onClick={() => history.push("/plans")}
              style={{ marginTop: theme.spacing(2) }}
            >
              Create a New Workout Plan
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => history.push("/plans")}
              style={{ marginTop: theme.spacing(2) }}
            >
              Schedule a Workout
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default ListModule;
