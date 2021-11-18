// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./ExercisesForm.styles";

// components

import { Typography, Grid } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import ExerciseColumn from "./ExerciseColumn/ExerciseColumn.component";
import MovementPicker from "../../../Movement/Movements/MovementPicker/MovementPicker.component";

const ExercisesForm = ({ planData, setPlanData }) => {
  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const [movementOptions, setMovementOptions] = useState([]);
  const [columns, setColumns] = useState({
    selections: {
      id: "selections",
      list: planData.exercises,
    },
  });
  const [draggableIdCounter, setDraggableIdCounter] = useState(0);

  // lifecycle

  // change planData state whenever column state changes, except on load when column is empty (?)

  useEffect(() => {
    setPlanData((previous) => ({
      ...previous,
      exercises: columns.selections.list,
    }));
  }, [columns, setPlanData]);

  // drag and drop

  const onDragEnd = ({ source, destination }) => {
    // make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // make sure we're actually moving the item
    if (source.index === destination.index) return null;

    // set start and end column variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      // if start is the same as end, we're in the same column

      // move the item within the list

      // start by making a new list without the dragged item
      console.log(start);
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // then insert the item at the right location
      newStartList.splice(destination.index, 0, start.list[source.index]);

      // then create a copy of the new column object
      const newCol = {
        id: start.id,
        list: newStartList.map((exercise, i) => ({ ...exercise, index: i })),
      };

      // update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    }
  };

  // event handlers

  const addExerciseToWorkout = (e, value) => {
    e.preventDefault();
    const newExercise = {
      movement: value,
      draggableId: draggableIdCounter,
      index: columns.selections.list.length,
    };
    setColumns((previous) => ({
      ...previous,
      selections: {
        ...previous.selections,
        list: [...previous.selections.list, newExercise],
      },
    }));
    setDraggableIdCounter((previous) => previous + 1);
  };

  return (
    <>
      <Typography 
        variant="body2" 
        gutterBottom 
        className={classes.instructions}
        style={{ marginBottom: theme.spacing(3), }}
      >
        Select exercises for the workout and change order, reps, and sets as
        desired.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MovementPicker
            setMovements={setMovementOptions}
            movementOptions={movementOptions}
            autocomplete={true}
            setSelectedMovement={addExerciseToWorkout}
          />
        </Grid>
        {columns.selections.list.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid item xs={12}>
              <Typography variant="h6">Selected Exercises</Typography>
              <ExerciseColumn
                column={columns.selections}
                columns={columns}
                setColumns={setColumns}
                isSelected={true}
              />
            </Grid>
          </DragDropContext>
        )}
      </Grid>
    </>
  );
};

export default ExercisesForm;
