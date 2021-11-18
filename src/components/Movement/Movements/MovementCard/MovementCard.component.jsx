import React from "react";

// hooks

import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./MovementCard.styles";

// api

import {
  addFavoriteMovement,
  removeFavoriteMovement,
  createSingleMovementSession,
} from "../../../../api/index.js";

// components

import {
  Card,
  CircularProgress,
  CardMedia,
  CardHeader,
  CardActions,
  IconButton,
  Collapse,
  CardContent,
  Typography,
} from "@mui/material";

import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  FitnessCenter as DumbbellIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import ExpandMore from "../../MovementDetails/ExpandMore";

// helper methods

import toTitleCase from "../../../../helperMethods/toTitleCase";

const MovementCard = ({
  movement,
  movement: { 
    // bodyPart, 
    equipment, 
    image, 
    _id: movementId, 
    title, 
    targets, 
    likes = [] },
  setMovements,
  cardIndex,
}) => {
  // hooks

  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const userId = JSON.parse(localStorage.getItem("profile"))?.user._id;
  const isFavorite = likes.includes(userId);
  const [expanded, setExpanded] = React.useState(false);

  // event handlers

  const handleFavorite = async (e) => {
    e.preventDefault();
    // determine whether selected movement is a favorite or a non-favorite
    try {
      let updatedMovement;
      if (isFavorite) {
        // make an api patch request to remove favorite, sending movement._id as parameter
        // receive an updated movement object as response
        ({ data: updatedMovement } = await removeFavoriteMovement(movementId));
        console.log(`got movement with favorite removed:`)
        console.dir(updatedMovement);
      } else {
        // make an api patch request to add favorite, sending movement._id as parameter
        // receive an updated movement object as response
        ({ data: updatedMovement } = await addFavoriteMovement(movementId));
        console.log(`got movement with favorite added:`)
        console.dir(updatedMovement);
      }
      // splice the response movement into state.movement
      setMovements((previous) => {
        return previous.slice(0, cardIndex).concat(updatedMovement, previous.slice(cardIndex + 1));
      });
      // change the heart icon variant from contained to outlined or vice versa
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttempt = async (e) => {
    e.preventDefault();
    console.log("handleAttempt invoked");
    try {
      // invoke api method to create a new plan with just this movement and a new session with this plan and just the current user as invitee
      const {
        data: { _id: sessionId },
      } = await createSingleMovementSession(movementId);
      // navigate to performance page with useHistory hook
      history.push(`/sessions/${sessionId}/perform`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={toTitleCase(title)} />
      {image ? (
        <CardMedia
          className={classes.cardMedia}
          component="img"
          height="400"
          image={image || movement?.gifUrl}
          alt={title}
          // title={title}
        />
      ) : (
        <CircularProgress style={{ margin: "75px auto" }} />
      )}
      <CardActions disableSpacing>
        {userId && (
          <>
            {isFavorite !== "loading..." && (
              <IconButton
                aria-label="toggle favorites"
                onClick={handleFavorite}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            )}
            <IconButton aria-label="share" onClick={handleAttempt}>
              <DumbbellIcon />
            </IconButton>
          </>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ marginLeft: "auto" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        <CardContent className={classes.cardContent} sx={{ paddingTop: 0 } }>
          {/* <Typography variant="body2" color="text.secondary">
            Region: {toTitleCase(bodyPart)}
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            Muscle(s): {toTitleCase(targets[0])}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Equipment: {toTitleCase(equipment[0])}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author:{" "}
            {movementId?.length === 4 ? "ExerciseDB" : movement?.creator}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MovementCard;
