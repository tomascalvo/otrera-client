import React from "react";

// hooks
import { useTheme } from '@mui/styles';
import useStyles from "./ExerciseCard.styles";

// components
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import SetLi from "./SetLi/SetLi.component";

const ExerciseCard = ({
  movement,
  goalResistance = undefined,
  goalReps = 5,
  goalSets = 3,
  sets,
  handleResistanceChange,
  handleRepsChange,
  clearSet,
  removeSet,
  completeSet,
  addSet,
}) => {

  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <div className={classes.imageContainer}>
        <img
          src={movement?.image || movement?.gifUrl}
          alt={`Exercise ${movement?.title || movement?.name}`}
          className={classes.image}
        />
      </div>
      <Typography variant="h4" className={classes.text} gutterBottom>
        {movement?.title || movement.name}
      </Typography>
      <Typography variant="body1" className={classes.text}>
        {movement?.description || `${movement.equipment} exercise targeting the ${movement.targets}`}
      </Typography>
      {movement?.instructions && (
        <List dense>
          {movement.instructions.map((instruction, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar src={instruction.image} alt={instruction.text} />
              </ListItemAvatar>
              <ListItemText primary={instruction.text} />
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h5" gutterBottom>
        Sets
      </Typography>
      <List disablePadding>
        {sets.map((set, i) => (
          <SetLi
            key={i}
            setIndex={i}
            goalResistance={
              sets[i - 1]?.resistance > goalResistance ||
              (sets[i - 1]?.resistance && !goalResistance)
                ? sets[i - 1]?.resistance
                : goalResistance
            }
            goalReps={goalReps}
            goalSets={goalSets}
            disabled={
              i === 0 ? false : sets[i - 1]?.reps === undefined ? true : false
            }
            actualResistance={set.resistance}
            actualReps={set.reps}
            actualSets={sets.length}
            handleResistanceChange={handleResistanceChange}
            handleRepsChange={handleRepsChange}
            clearSet={clearSet}
            removeSet={removeSet}
            completeSet={completeSet}
            addSet={addSet}
            isLast={i === sets.length - 1}
            isLastActive={
              ((sets[i + 1]?.reps === undefined || !sets[i + 1]) &&
                !(sets[i]?.reps >= goalReps)) ||
              false
            }

          />
        ))}
      </List>
    </>
  );
};

export default ExerciseCard;
