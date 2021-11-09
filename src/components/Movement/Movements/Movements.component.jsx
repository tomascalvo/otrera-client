// hooks
import React, { useState } from "react";
import { useTheme } from '@mui/styles';
import useStyles from "./Movements.styles";

// components

import { Container, Typography, Grid } from "@mui/material";

import MovementPicker from "./MovementPicker/MovementPicker.component";
import MovementCard from "./MovementCard/MovementCard.component";

const Movements = () => {
  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const defaultMovements = JSON.parse(
    localStorage.getItem("EDBmovements")) || [];
    
  const [movements, setMovements] = useState(defaultMovements);

  return (
    <>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Exercises
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Search for exercises by name, keyword, muscle group, difficulty, or
            equipment.
          </Typography>
          <MovementPicker setMovements={setMovements} />
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {movements.length} Results
        </Typography>
        <Grid container spacing={4}>
          {movements.map((movement, i) => (
            <MovementCard key={i} movement={movement} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Movements;
