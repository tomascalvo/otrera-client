import React from "react";

// hooks

import { useHistory } from 'react-router-dom';
import useStyles from "./MovementCard.styles";

// components

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  // CardActions,
  // Button,
  CircularProgress,
} from "@mui/material";

const MovementCard = ({
  movement: { bodyPart, equipment, gifUrl, id, name, target },
}) => {

  // hooks
  
  const history = useHistory();
  const classes = useStyles();

  // event handlers

  const handleClick = (e) => {
    e.preventDefault();
    console.log('card clicked');
    history.push(`/movements/${id}`);
  }
  
  return (
    <Grid item xs={6} sm={4} md={3} xl={3}>
      <Card className={classes.card}
        onClick={handleClick}
      >
        {gifUrl ? (
          <CardMedia
            className={classes.cardMedia}
            component="image"
            height={"200"}
            image={
              gifUrl !== undefined
                ? gifUrl
                : "https://source.unsplash.com/random"
            }
            alt={name}
            title={name}
          />
        ) : (
          <CircularProgress style={{ margin: "75px auto" }} />
        )}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography>region: {bodyPart}</Typography>
          <Typography>muscle(s): {target}</Typography>
          <Typography>equipment: {equipment}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MovementCard;
