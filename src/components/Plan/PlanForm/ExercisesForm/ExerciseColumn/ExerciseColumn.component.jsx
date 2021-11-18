import React from "react";
import { List } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import ExerciseLI from "./ExerciseLI/ExerciseLI.component";
import useStyles from "./ExerciseColumn.styles";
import { useTheme } from '@mui/styles';

const ExerciseColumn = ({ column, columns, setColumns, isSelected }) => {

  // hooks
  
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.column}>
      <Droppable droppableId={column.id}>
        {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {column?.list.length > 0 && column?.list
                .sort((a, b) => a.index > b.index)
                .map((exercise, i) => {
                  return (
                    <ExerciseLI
                      key={exercise.draggableId}
                      draggableId={exercise.draggableId}
                      exercise={exercise}
                      columns={columns}
                      setColumns={setColumns}
                      isSelected={isSelected}
                    />
                  );
                })}
              {provided.placeholder}
            </List>
        )}
      </Droppable>
    </div>
  );
};

export default ExerciseColumn;
