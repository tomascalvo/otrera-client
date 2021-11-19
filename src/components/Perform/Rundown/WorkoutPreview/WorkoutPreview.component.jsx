import React from "react";

// hooks

import { useTheme } from '@mui/styles';
import useStyles from './WorkoutPreview.styles';

// components

import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

const WorkoutPreview = ({ performance }) => {

  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);
  
  return (
    <div style={{ 
      paddingTop: theme.spacing(3)
      }}>
      <Typography variant="h5">Workout Preview</Typography>
      <List>
        {performance?.session?.plan?.exercises.map((exercise, i) => (
          <ListItem key={i}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-flex", width: "75%" }}>
                <ListItemAvatar>
                  <Avatar
                    src={exercise?.movement?.image ?? exercise?.EDBmovement?.gifUrl}
                    alt={`Avatar of ${exercise?.movement?.title}`}
                    className={classes.gifUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${
                    exercise?.movement?.title || exercise?.EDBmovement?.name
                  }`}
                  secondary={exercise?.movement?.description}
                />
              </div>
              {exercise?.sets && (
                <div>
                  <ListItemText
                    primary={`${exercise.sets} / ${exercise.reps}`}
                  />
                </div>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default WorkoutPreview;
