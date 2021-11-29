import React from "react";

// hooks
import { useTheme } from "@mui/styles";
import useStyles from "./SetLi.styles";

import { ListItem, Stack, Box } from "@mui/material";

import ResistanceInput from "./ResistanceInput/ResistanceInput.component";
import RepsInput from "./RepsInput/RepsInput.component";
import SetButtons from "./SetButtons/SetButtons.component";

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

  return (
    <ListItem disableGutters>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box item xs={9} className={classes.gridItem} sx={{ width: "100%" }}>
          <ResistanceInput
            setIndex={setIndex}
            disabled={disabled}
            goalResistance={goalResistance}
            actualResistance={actualResistance}
            handleResistanceChange={handleResistanceChange}
            classes={classes}
          />
          <RepsInput
            setIndex={setIndex}
            classes={classes}
            goalReps={goalReps}
            handleRepsChange={handleRepsChange}
            actualReps={actualReps}
            disabled={disabled}
          />
        </Box>
        <Box item xs={3} className={classes.gridItem} sx={{}}>
          {!disabled && (
            <SetButtons
              completeSet={completeSet}
              setIndex={setIndex}
              actualResistance={actualResistance}
              goalResistance={goalResistance}
              actualReps={actualReps}
              goalReps={goalReps}
              classes={classes}
              isLast={isLast}
              clearSet={clearSet}
              removeSet={removeSet}
              actualSets={actualSets}
              goalSets={goalSets}
              addSet={addSet}
            />
          )}
        </Box>
      </Stack>
    </ListItem>
  );
};

export default SetLi;
