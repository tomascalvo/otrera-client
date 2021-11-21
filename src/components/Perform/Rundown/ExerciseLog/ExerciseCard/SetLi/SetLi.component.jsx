import React from "react";

// hooks
import { useTheme } from "@mui/styles";
import useStyles from "./SetLi.styles";

import {
  ListItem,
  Stack,
  Box,
  TextField,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  Done as DoneIcon,
  Add as PlusIcon,
  Remove as MinusIcon,
} from "@material-ui/icons";

const SetLi = ({
  setIndex,
  goalResistance,
  goalReps = 5,
  goalSets,
  disabled,
  actualResistance,
  actualReps,
  actualSets,
  handleResistanceChange,
  handleRepsChange,
  clearSet,
  removeSet,
  completeSet,
  addSet,
  isLast,
  // isLastActive,
}) => {
  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);

  const ResistanceInput = () => (
    <TextField
      id={`${setIndex}resistance`}
      disabled={disabled}
      label={`Resist.${goalResistance ? " (" + goalResistance + ")" : ""}`}
      type="number"
      variant="outlined"
      className={classes.textField}
      // sx={{ marginRight: theme.spacing(1)}}
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
      // inputRef={input => input && input.focus()}
    />
  );

  const RepsInput = () => (
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

  const SetButtons = () => (
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

  return (
    <ListItem disableGutters>
      <Stack direction='row'>
        <Box item xs={9} className={classes.gridItem}>
          <ResistanceInput />
          <RepsInput />
        </Box>
        {!disabled && (
          <Box item xs={3} className={classes.gridItem}>
            <SetButtons />
          </Box>
        )}
      </Stack>
    </ListItem>
  );
};

export default SetLi;
