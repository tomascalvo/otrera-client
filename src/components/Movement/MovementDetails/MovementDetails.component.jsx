// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./MovementDetails.styles";
import { useParams } from "react-router-dom";

// api

import {
  fetchMovement,
} from "../../../api/index.js";

// components

import {
  Box,
} from "@mui/material";

import MovementCard from "../Movements/MovementCard/MovementCard.component";

const MovementDetails = () => {

  // hooks
  const { id: movementId } = useParams();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state
  const [movement, setMovement] = useState("loading...");

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

  // render

  return (
    <Box className={classes.box}>
      <MovementCard movement={movement} />
    </Box>
  );
};

export default MovementDetails;
