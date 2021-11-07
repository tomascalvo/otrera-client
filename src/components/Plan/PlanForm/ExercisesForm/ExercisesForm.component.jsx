// hooks

import React, { useState, useEffect } from "react";
import useStyles from "./ExercisesForm.styles";

// components

import { Typography, Grid, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@material-ui/icons";
import { DragDropContext } from "react-beautiful-dnd";
import ExerciseColumn from "./ExerciseColumn/ExerciseColumn.component";

// api

import { fetchMovements } from "../../../../api/index";

// data

import { conformToExercise } from "../../../../dataset/ExerciseDBAPIdata";

const ExercisesForm = ({ planData, setPlanData }) => {
  // hooks
  const classes = useStyles();

  // state
  const [query, setQuery] = useState("");
  const EDBmovements = JSON.parse(localStorage.getItem("EDBmovements")).map(
    (EDBmovement, i) => {
      return conformToExercise(EDBmovement, i);
    }
  );
  const [exerciseOptions, setExerciseOptions] = useState(EDBmovements || []);
  const [filteredOptions, setFilteredOptions] = useState(
    EDBmovements.slice(0, 9) || []
  );
  const [columns, setColumns] = useState({
    options: {
      id: "options",
      list: [],
    },
    selections: {
      id: "selections",
      list: planData.exercises,
    },
  });

  // lifecycle

  // get a list of exercise options on mount
  useEffect(() => {
    async function fetchData() {
      const { data: MDBmovements } = await fetchMovements();
      setExerciseOptions((previous) => {
        return [
          ...previous,
          ...MDBmovements.map((movement, index) => ({
            index,
            draggableId: parseInt(previous.length + index),
            movement,
            reps: movement.reps.recommended,
            sets: movement.reps.recommended,
            resistance: movement.resistance,
          })),
        ];
      });
    }
    fetchData();
  }, []);

  // filter exercise options dynamically by search query
  useEffect(() => {
    let optionsToShow;
    if (query === "") {
      optionsToShow = exerciseOptions;
    } else {
      optionsToShow = exerciseOptions.filter((option) => {
        const trimmedQuery = query.toLowerCase().trim();
        const queryStrings = trimmedQuery.split(" ");
        return Object.values(option?.movement || option?.EDBmovement).some(
          (value) => {
            if (typeof value === "string") {
              return queryStrings.every((queryString) => {
                return value.split(" ").includes(queryString);
              });
            } else if (Array.isArray(value)) {
              return value.some((element) => {
                if (typeof element === "string") {
                  return queryStrings.every((queryString) => {
                    return element.split(" ").includes(queryString);
                  });
                } else if (typeof element === "object") {
                  return Object.values(element).some((value) => {
                    return (
                      typeof value === "string" &&
                      queryStrings.every((queryString) =>
                        value.split(" ").includes(queryString)
                      )
                    );
                  });
                } else {
                  return false;
                }
              });
            } else {
              return false;
            }
          }
        );
      });
    }
    setFilteredOptions(optionsToShow.slice(0, 8));
  }, [exerciseOptions, query]);

  // add filtered options to options column whenever they change
  useEffect(() => {
    setColumns((state) => ({
      ...state,
      options: {
        ...state.options,
        list: filteredOptions,
      },
    }));
  }, [filteredOptions]);

  // change planData state whenever column state changes, except on load when column is empty (?)
  useEffect(() => {
    setPlanData((prevData) => ({
      ...prevData,
      exercises: columns.selections.list,
    }));
  }, [columns, setPlanData]);

  // drag and drop

  const onDragEnd = ({ source, destination }) => {
    console.log("source: ");
    console.dir(source);
    console.log("destination: ");
    console.dir(destination);

    // make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return null;

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
    } else {
      // if start is different from end, we need to update multiple columns

      // filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // create a new start column
      const newStartColumn = {
        id: start.id,
        list: newStartList.map((exercise, i) => ({ ...exercise, index: i })),
      };

      // make a new end list array
      const newEndList = end.list;

      // insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // create a new end column
      const newEndColumn = {
        id: end.id,
        list: newEndList.map((exercise, i) => ({ ...exercise, index: i })),
      };

      // update the state
      setColumns((state) => ({
        ...state,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      }));
    }
  };

  return (
    <>
      <Typography variant="body2" gutterBottom className={classes.instructions}>
        Select exercises for the workout and change order, reps, and sets as
        desired.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Search Movements</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              label="Guests"
              fullWidth
            />
          </div>
        </Grid>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6">Search Results</Typography>
            <ExerciseColumn
              columns={columns}
              column={columns.options}
              setColumns={setColumns}
              isSelected={false}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h6">Selected Exercises</Typography>
            <ExerciseColumn
              column={columns.selections}
              columns={columns}
              setColumns={setColumns}
              isSelected={true}
            />
          </Grid>
        </DragDropContext>
      </Grid>
    </>
  );
};

export default ExercisesForm;
