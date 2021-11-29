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
      helperText={`Goal: ${goalReps}`}
      onChange={handleRepsChange}
      value={actualReps === undefined ? "" : actualReps}
      type="number"
      variant="outlined"
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
