import React from "react";

import { useTheme } from "@mui/styles";
import useStyles from "./ListModule.styles";
import { useHistory } from "react-router-dom";

import moment from "moment";

// components

import {
  Box,
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

const LoadingAnimation = () => (
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
);

const ListArray = ({ label, array = [], handleClick, model }) => (
  <List aria-label={label}>
    {array.map((workout, i) => {
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
      );
    })}
  </List>
);

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

const AddContentButton = ({ model }) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div
      className={classes.buttonDiv}
    >
      {model === "plan" ? (
        <Button
          variant="contained"
          onClick={() => history.push("/plans")}
          style={{
            margin: "auto",
          }}
        >
          Create a New Workout Plan
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => history.push("/plans")}
          style={{
            margin: "auto",
          }}
        >
          Schedule a Workout
        </Button>
      )}
    </div>
  );
};

const ListModule = ({ array = [], model, label = "list", handleClick }) => {
  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box className={classes.flexContainer}>
      {array === "loading" ? (
        <LoadingAnimation />
      ) : Array.isArray(array) && array.length > 0 ? (
        <ListArray
          label={label}
          array={array}
          handleClick={handleClick}
          model={model}
        />
      ) : (
        <>
          <Typography
            color="textSecondary"
            style={{ marginTop: theme.spacing(2) }}
          >
            No {label.toLowerCase()}.
          </Typography>
        </>
      )}
      <AddContentButton model={model} />
    </Box>
  );
};

export default ListModule;
