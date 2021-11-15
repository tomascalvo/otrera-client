import React, { useState, useEffect } from "react";
import moment from "moment";

// hooks

import { useTheme } from "@mui/styles";
import { useHistory } from "react-router-dom";
import useStyles from "./GoalForm.styles";

// components

import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";

import MovementPicker from "../../Movement/Movements/MovementPicker/MovementPicker.component";

// API

import { createGoal } from "../../../api/index";

const GoalForm = () => {

  // hooks

  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const blankForm = {
    title: "",
    movement: "",
    resistance: 0,
    reps: 1,
    sets: 1,
    start: undefined,
    finish: undefined,
  };

  const defaultMovements =
    JSON.parse(localStorage.getItem("EDBmovements")) || [];

  const [formData, setFormData] = useState(blankForm);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [movementOptions, setMovementOptions] = useState(defaultMovements);
  const [isConfirmation, setIsConfirmation] = useState(false);

  // lifecycle

  // push to signin page if no profile in localStorage

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      history.push("/auth");
    }
  }, [history]);

  // event handlers

  const setSelectedMovement = (e, value) => {
    e.preventDefault();
    console.log("setSelectedMovement called");
    console.log(`value: ${value}`);
    setFormData((previous) => ({
      ...previous,
      movement: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const keys = Object.keys(formData);

      console.log("GoalForm.component keys:");
      console.dir(keys);

      const keysUndefined = keys.map((key) => {
        if (formData[key] !== "") {
          return { [key]: formData[key] };
        } else {
          return { [key]: undefined };
        }
      });

      const newGoal = keysUndefined.reduce((target, source) => {
        return Object.assign(target, source);
      });

      const { data: confirmation } = await createGoal({
        ...newGoal,
        movement: newGoal.movement.id,
      });

      console.log("createGoal confirmation:");
      console.dir(confirmation);

      setIsConfirmation(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isConfirmation) {
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography align="center" gutterBottom>
            Goal created successfully.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            onClick={() => history.push("/goals")}
          >
            Goals
          </Button>
        </Paper>
      </main>
    );
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          New Goal
        </Typography>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              value={formData?.title}
              fullWidth
              onChange={(e) => {
                setFormData((previous) => {
                  return { ...previous, title: e.target.value };
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <>
              <Typography variant="h6" gutterBottom>
                Movement
              </Typography>
              <MovementPicker
                movementOptions={movementOptions}
                setMovements={setMovementOptions}
                autocomplete={true}
                selectedMovement={formData?.movement}
                setSelectedMovement={setSelectedMovement}
              />
            </>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Metrics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="resistance"
              label="Minimum Resistance"
              fullWidth
              type="number"
              value={formData?.resistance}
              helperText={helperText}
              error={error}
              inputProps={{
                min: 0,
                maxLength: 4,
                step: "5",
                // inputMode: 'numeric',
                // pattern: '[0-9]*'
              }}
              onChange={(e) => {
                const wholeNumberRegex = /^\d+$/;
                if (e.target.value.match(wholeNumberRegex)) {
                  console.log("Input passes regex match");
                  setHelperText("");
                  setError(false);
                  setFormData((previous) => {
                    return { ...previous, resistance: e.target.value }
                  });
                } else {
                  // console.log("Input fails regex match");
                  // setHelperText("Invalid entry: choose a whole number.");
                  // setError(true);
                  setFormData((previous) => {
                    return { ...previous, resistance: e.target.value.replace(/[^0-9]/g, "") }
                  });
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="reps"
              label="Minimum Reps"
              value={formData?.reps}
              fullWidth
              type="number"
              inputProps={{
                min: 1,
                maxLength: 4,
                step: "1",
                // inputMode: 'numeric',
                // pattern: '[0-9]*'
              }}
              onChange={(e) => {
                setFormData((previous) => {
                  return { ...previous, reps: e.target.value };
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="sets"
              label="Minimum Sets"
              value={formData?.sets}
              fullWidth
              type="number"
              inputProps={{
                min: 1,
                maxLength: 2,
                step: "1",
                // inputMode: 'numeric',
                // pattern: '[0-9]*'
              }}
              onChange={(e) => {
                setFormData((previous) => {
                  return { ...previous, sets: e.target.value };
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Timing
            </Typography>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                name="start"
                label="Start Date"
                fullWidth
                value={formData?.start || new Date()}
                renderInput={(params) => <TextField {...params} />}
                onChange={(date) =>
                  setFormData((previous) => ({
                    ...previous,
                    start: date,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                name="finish"
                label="Deadline"
                fullWidth
                value={formData?.finish || moment().add(6, "months")}
                renderInput={(params) => <TextField {...params} />}
                onChange={(date) =>
                  setFormData((previous) => ({
                    ...previous,
                    finish: date,
                  }))
                }
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              className={classes.button}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export default GoalForm;
