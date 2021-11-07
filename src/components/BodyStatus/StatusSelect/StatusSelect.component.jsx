import React, { useState, useEffect } from "react";

import useStyles from "./StatusSelect.styles";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // FormHelperText,
} from "@mui/material";

const StatusSelect = ({ region, conditions, bodyStatus, handleChange }) => {
  const [condition, setCondition] = useState("");
  useEffect(() => {
    const conditionData = bodyStatus[region];
    if (conditionData !== undefined) {
      setCondition(conditionData);
    } 
  }, [region, bodyStatus]);
  const classes = useStyles({ condition });
  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        //   shrink
        id="region-select-label"
      >
        {region}
      </InputLabel>
      <Select
        labelId="region-select-label"
        id="region-select"
        name={region}
        // value={bodyStatus[region] !== undefined ? bodyStatus[region] : ""}
        value={condition}
        onChange={handleChange}
        className={classes.select}
      >
        <MenuItem value="" disabled>
          <em>No status on record</em>
        </MenuItem>
        {conditions.map((condition, i) => (
          <MenuItem key={i} value={condition}>
            {condition}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
