import React from 'react';

// hooks

import useStyles from './GoalPicker.styles';

// component

import { NativeSelect, FormControl } from "@mui/material";

const GoalPicker = ({ goals, selectedGoal, handleSelectChange }) => {

  // console.log(`GoalPicker.component selectedGoal: ${selectedGoal}`);
  
  // hooks

  const classes = useStyles();
  
  return (
    <>
      <FormControl
        className={classes.formControl}
      >
        <NativeSelect
          value={selectedGoal}
          // defaultValue=""
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value={""}>All Goals</option>
          {
            goals.map((goal, i) => (
              <option value={goal._id} key={i}>{goal.title}</option>
            ))
          }
        </NativeSelect>
      </FormControl>
    </>
  )
}

export default GoalPicker
