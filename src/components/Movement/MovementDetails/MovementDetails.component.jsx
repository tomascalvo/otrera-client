// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./MovementDetails.styles";
import { useParams, useHistory } from "react-router-dom";

// api

import {
  fetchMovement,
  addFavoriteMovement,
  removeFavoriteMovement,
  createSingleMovementSession,
} from "../../../api/index.js";

// components

import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from "@mui/material";

import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  FitnessCenter as DumbbellIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import ExpandMore from "./ExpandMore";

// helper methods

import toTitleCase from "../../../helper methods/toTitleCase";

const MovementDetails = () => {
  // hooks

  const { id: movementId } = useParams();
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  // state

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.user
  );
  const [movement, setMovement] = useState("loading...");
  const [isFavorite, setIsFavorite] = useState("loading...");
  const [expanded, setExpanded] = React.useState(false);

  // lifecycle

  useEffect(() => {
    const getMovementData = async () => {
      console.log(`getting movement data for movementId: ${movementId}`);
      try {
        const { data: movementData } = await fetchMovement(movementId);
        setMovement(movementData);
      } catch (error) {
        console.log(error);
      }
    };
    getMovementData();
  }, [movementId]);

  useEffect(() => {
    setIsFavorite(
      user?.favoriteMovements.find((favoriteMovement) => {
        return favoriteMovement === movementId;
      })
        ? true
        : false
    );
  }, [user.favoriteMovements, movementId]);

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
        return favoriteMovement === movement.id;
      })
    ) {
      try {
        const { data: userWithNewFavorite } = await addFavoriteMovement(
          movement?.id
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
          movement?.id
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

  // render

  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <CardHeader title={toTitleCase(movement?.name)} />
        {movement?.gifUrl ? (
          <CardMedia
            className={classes.cardMedia}
            component="img"
            height="400"
            image={movement?.gifUrl || movement?.image}
            alt={movement?.name}
            // title={movement?.name}
          />
        ) : (
          <CircularProgress style={{ margin: "75px auto" }} />
        )}
        <CardActions 
          disableSpacing
          // style={{
          //   display: 'flex',
          //   justifyContent: 'space-between',
          // }}
        >
          {isFavorite !== "loading..." && (
            <IconButton aria-label="toggle favorites" onClick={handleFavorite}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
          {user && (
            <IconButton aria-label="share" onClick={handleAttempt}>
              <DumbbellIcon />
            </IconButton>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ marginLeft: 'auto' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Region: {toTitleCase(movement?.bodyPart)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Muscle(s): {toTitleCase(movement?.target)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Equipment: {toTitleCase(movement?.equipment)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author:{" "}
              {movement?.id?.length === 4 ? "ExerciseDB" : movement?.creator}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default MovementDetails;
