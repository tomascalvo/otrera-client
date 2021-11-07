import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Clear as ClearIcon, Add as AddIcon } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import useStyles from "./ExerciseLI.styles";

const ExerciseLI = ({
  exercise: { draggableId, movement, EDBmovement, reps, sets, index },
  columns,
  setColumns,
  isSelected,
}) => {
  // diagnostic
  // console.log("index:", index, typeof index);

  const classes = useStyles();

  function handleSelect(e, buttonType) {
    e.preventDefault();

    const filterOutExercise = (array) =>
      array
        .filter((item) => item.draggableId !== draggableId)
        .map((exercise, i) => ({ ...exercise, index: i }));

    const spliceInExercise = (targetArray) => {
      const splicedArray = targetArray;
      let lastIndex = 0;
      if (targetArray.length > 0) {
        lastIndex = targetArray.length;
      }
      splicedArray.splice(lastIndex, 0, {
        draggableId,
        movement,
        EDBmovement,
        sets,
        reps,
        index: lastIndex,
      });
      return splicedArray;
    };

    let updatedOptions;
    let updatedSelections;

    if (buttonType === "select") {
      updatedOptions = filterOutExercise(columns.options.list);
      updatedSelections = spliceInExercise(columns.selections.list);
    } else if (buttonType === "clear") {
      updatedOptions = spliceInExercise(columns.options.list);
      updatedSelections = filterOutExercise(columns.selections.list);
    } else {
      return;
    }

    setColumns((state) => ({
      ...state,
      options: { ...state.options, list: updatedOptions },
      selections: { ...state.selections, list: updatedSelections },
    }));
  }
  function handleSetsRepsChange(e) {
    e.preventDefault();
    const filteredSelections = columns.selections.list.filter((exercise) => {
      return exercise.draggableId !== draggableId;
    });
    const updatedExercise =
      e.target.id === "sets"
        ? {
            draggableId,
            movement,
            EDBmovement,
            sets: parseInt(e.target.value),
            reps,
            index,
          }
        : e.target.id === "reps"
        ? {
            draggableId,
            movement,
            EDBmovement,
            sets,
            reps: parseInt(e.target.value),
            index,
          }
        : {
            draggableId,
            movement,
            EDBmovement,
            sets,
            reps,
            index,
          };
    filteredSelections.splice(updatedExercise.index, 0, updatedExercise);
    setColumns((state) => ({
      ...state,
      selections: {
        ...state.selections,
        list: filteredSelections,
      },
    }));
  }

  return (
    <Draggable
      draggableId={draggableId.toString()}
      key={draggableId}
      index={parseInt(index)}
    >
      {(provided) => (
        <ListItem
          key={draggableId}
          role={undefined}
          dense
          button
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemAvatar>
            <Avatar
              src={movement?.image || EDBmovement?.image}
              alt={`Avatar of ${movement?.title || EDBmovement?.title}`}
            />
          </ListItemAvatar>
          <div style={{ width: '100%' }}>
            <ListItemText primary={`${movement?.title || EDBmovement?.title}`} />
            {isSelected && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  className={classes.setsReps}
                  label="Sets"
                  id="sets"
                  type="number"
                  value={sets}
                  inputProps={{
                    min: 1,
                    maxLength: 2,
                    step: "1",
                  }}
                  onChange={handleSetsRepsChange}
                />
                <TextField
                  className={classes.setsReps}
                  label="Reps"
                  id="reps"
                  type="number"
                  value={reps}
                  inputProps={{
                    min: 1,
                    maxLength: 4,
                    step: "1",
                  }}
                  onChange={handleSetsRepsChange}
                />
              </div>
            )}
          </div>
          <ListItemSecondaryAction>
            {isSelected ? (
              <Tooltip title="Remove Exercise" aria-label="Remove Exercise">
                <IconButton
                  edge="end"
                  aria-label="Remove Exercise"
                  onClick={(e) => handleSelect(e, "clear")}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Select Exercise" aria-label="Select Exercise">
                <IconButton
                  edge="end"
                  aria-label="Select Exercise"
                  onClick={(e) => handleSelect(e, "select")}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default ExerciseLI;
