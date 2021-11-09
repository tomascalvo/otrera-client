// hooks
import React from "react";
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
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Card className={classes.card}>
        {gifUrl ? (
          <CardMedia
            className={classes.cardMedia}
            // component="img"
            // height="200"
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
