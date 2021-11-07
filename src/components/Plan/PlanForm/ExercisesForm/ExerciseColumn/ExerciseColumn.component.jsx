import React from "react";
import { List } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import ExerciseLI from "./ExerciseLI/ExerciseLI.component";
import useStyles from "./ExerciseColumn.styles";

const ExerciseColumn = ({ column, columns, setColumns, isSelected }) => {
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <Droppable droppableId={column.id}>
        {(provided) => (
          // <RootRef rootRef={provided.innerRef}>
            <List ref={provided.innerRef}>
              {column?.list.length > 0 && column?.list
                .sort((a, b) => a.index > b.index)
                .map((exercise) => {
                  return (
                    <ExerciseLI
                      key={exercise.draggableId}
                      exercise={exercise}
                      columns={columns}
                      setColumns={setColumns}
                      isSelected={isSelected}
                    />
                  );
                })}
              {provided.placeholder}
            </List>
          // </RootRef>
        )}
      </Droppable>
    </div>
  );
};

export default ExerciseColumn;
