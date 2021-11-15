import React, { useState, useEffect } from "react";

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

import toTitleCase from "../../../../helper methods/toTitleCase";

const MovementCard = ({
  movement,
  movement: { bodyPart, equipment, gifUrl, id: movementId, name, target },
}) => {
  // hooks

  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.user
  );
  const [isFavorite, setIsFavorite] = useState("loading...");
  const [expanded, setExpanded] = React.useState(false);

  // lifecycle

  useEffect(() => {
    setIsFavorite(
      user?.favoriteMovements.find((favoriteMovement) => {
        return favoriteMovement === movementId;
      })
        ? true
        : false
    );
  }, [user?.favoriteMovements, movementId]);

  // event handlers

  const handleFavorite = async (e) => {
    e.preventDefault();
    console.log("handleFavorite event handler invoked");
    const profile = JSON.parse(localStorage.getItem("profile"));
    function updateProfile(updatedUser) {
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem(
          "profile",
          JSON.stringify({ ...profile, user: updatedUser })
        );
      }
      return;
    }
    if (
      !user?.favoriteMovements.find((favoriteMovement) => {
        return favoriteMovement === movementId;
      })
    ) {
      try {
        const { data: userWithNewFavorite } = await addFavoriteMovement(
          movementId
        );
        console.log("userWithNewFavorite:");
        console.dir(userWithNewFavorite);
        updateProfile(userWithNewFavorite);
        console.log("new favoriteMovement added to user");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data: userWithFewerFavorites } = await removeFavoriteMovement(
          movementId
        );
        updateProfile(userWithFewerFavorites);
        console.log("favoriteMovement removed from user");
      } catch (error) {
        console.log(error);
      }
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
      <CardHeader title={toTitleCase(name)} />
      {gifUrl ? (
        <CardMedia
          className={classes.cardMedia}
          component="img"
          height="400"
          image={gifUrl || movement?.image}
          alt={name}
          // title={name}
        />
      ) : (
        <CircularProgress style={{ margin: "75px auto" }} />
      )}
      <CardActions disableSpacing>
        {user && (
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
          <Typography variant="body2" color="text.secondary">
            Region: {toTitleCase(bodyPart)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Muscle(s): {toTitleCase(target)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Equipment: {toTitleCase(equipment)}
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
