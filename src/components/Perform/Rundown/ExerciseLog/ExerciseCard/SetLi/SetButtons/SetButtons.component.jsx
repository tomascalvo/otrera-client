import React from "react";

// components

import { Tooltip, IconButton } from "@mui/material";

import {
  Done as DoneIcon,
  Add as PlusIcon,
  Remove as MinusIcon,
} from "@material-ui/icons";

const SetButtons = ({
  completeSet,
  setIndex,
  actualResistance,
  goalResistance,
  actualReps,
  goalReps,
  classes,
  isLast,
  clearSet,
  removeSet,
  actualSets,
  goalSets,
  addSet,
}) => {
  return (
    <>
      <Tooltip title="Complete Set" aria-label="Complete Set">
        <span>
          <IconButton
            onClick={() =>
              completeSet(
                setIndex,
                actualResistance !== undefined
                  ? actualResistance
                  : goalResistance !== undefined
                  ? actualResistance
                  : undefined
              )
            }
            disabled={actualReps >= goalReps}
            color={actualReps < goalReps || !actualReps ? "primary" : "default"}
            className={classes.iconButton}
          >
            <DoneIcon />
          </IconButton>
        </span>
      </Tooltip>
      {isLast && (
        <>
          <Tooltip
            title={`${setIndex === 0 ? "Clear Reps" : "Remove Set"}`}
            aria-label={`${setIndex === 0 ? "Clear Reps" : "Remove Set"}`}
          >
            <IconButton
              color="default"
              onClick={() => {
                if (setIndex === 0) {
                  clearSet(setIndex);
                } else {
                  removeSet(setIndex);
                }
              }}
              className={classes.iconButton}
            >
              <MinusIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Set" aria-label="Add Set">
            <IconButton
              color={actualSets < goalSets ? "primary" : "default"}
              onClick={addSet}
              className={classes.iconButton}
            >
              <PlusIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default SetButtons;
