import React from "react";

// components

import { TextField, InputAdornment } from "@mui/material";

const ResistanceInput = ({
  setIndex,
  disabled,
  goalResistance,
  actualResistance,
  handleResistanceChange,
  classes
}) => {

  // render

  return (
    <TextField
      id={`${setIndex}resistance`}
      label={`Resist.${goalResistance ? " (" + goalResistance + ")" : ""}`}
      className={classes.textField}
      disabled={disabled}
      type="number"
      variant="outlined"
      value={actualResistance === undefined ? "" : actualResistance}
      onChange={handleResistanceChange}
      InputLabelProps={{
        classes: {
          // text styles
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutine,
        },
        min: 0,
        maxLength: 3,
        step: "5",
        endAdornment: !disabled ? (
          <InputAdornment position="end">lbs</InputAdornment>
        ) : null,
      }}
      // inputRef={(input) => input && input.focus()}
    />
  );
};

export default ResistanceInput;
