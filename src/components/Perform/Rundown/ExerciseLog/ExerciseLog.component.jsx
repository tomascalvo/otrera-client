import React from "react";

// hooks

import useStyles from "./ExerciseLog.styles";

// components

import { Button, Tooltip } from "@mui/material";

import { DoneAll as DoneAllIcon } from "@material-ui/icons";

import ExerciseCard from "./ExerciseCard/ExerciseCard.component";

const ExerciseLog = ({
  // performance props
  performance,
  handleSetChange,
  completeSet,
  clearSet,
  addSet,
  removeSet,
  completeExercise,
  // steps props
  steps,
  activeStep,
  handleBack,
  handleNext,
}) => {

  // hooks
  const classes = useStyles();

  const movement = performance.attempts[activeStep - 1]?.movement || performance.attempts[activeStep - 1]?.EDBmovement;

  console.log(`ExerciseLog.component movement: ${movement}`);

  return (
    <>
      <ExerciseCard
        movement={performance.attempts[activeStep - 1]?.movement}
        goalResistance={performance.attempts[activeStep - 1]?.resistance}
        goalReps={performance.attempts[activeStep - 1]?.reps}
        goalSets={performance.attempts[activeStep - 1]?.sets}
        sets={performance.attempts[activeStep - 1]?.sets}
        handleResistanceChange={handleSetChange}
        handleRepsChange={handleSetChange}
        clearSet={clearSet}
        removeSet={removeSet}
        addSet={addSet}
        completeSet={completeSet}
      />
      <div className={classes.buttons}>
        {activeStep !== 0 && (
          <>
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
            <Tooltip title="Complete Exercise" aria-label="Complete Exercise">
              <Button
                variant="outlined"
                color={ 
                  performance.attempts[activeStep - 1]?.sets.length <
                    performance.attempts[activeStep - 1]?.exercise?.sets ||
                  performance.attempts[activeStep - 1]?.sets.find((set) => {
                    return (
                      set?.reps <
                      performance.attempts[activeStep - 1]?.exercise?.reps
                    );
                  })
                    ? "primary"
                    : "inherit"
                }
                className={classes.button}
                onClick={completeExercise}
              >
                <DoneAllIcon />
              </Button>
            </Tooltip>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Finish Workout" : "Next"}
        </Button>
      </div>
    </>
  );
};

export default ExerciseLog;
