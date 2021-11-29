import React from "react";

import { TextField } from "@mui/material";

const RepsInput = ({
  setIndex,
  classes,
  goalReps,
  handleRepsChange,
  actualReps,
  disabled,
}) => {
  return (
    <TextField
      id={`${setIndex}reps`}
      label={`Reps`}
      className={classes.textField}
      type="number"
      variant="outlined"
      value={actualReps === undefined ? "" : actualReps}
      onChange={handleRepsChange}
      helperText={`Goal: ${goalReps}`}
      InputProps={{
        min: 0,
        maxLength: 3,
        step: "1",
      }}
      disabled={disabled}
    />
  );
};

export default RepsInput;
