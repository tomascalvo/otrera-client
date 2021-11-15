// hooks
import React, { useState } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./Movements.styles";

// components

import { Container, Typography, Grid } from "@mui/material";

import Header from "../../Header/Header.component";
import MovementPicker from "./MovementPicker/MovementPicker.component";
import MovementCard from "./MovementCard/MovementCard.component";

const Movements = () => {
  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const defaultMovements =
    JSON.parse(localStorage.getItem("EDBmovements")) || [];

  const [movements, setMovements] = useState(defaultMovements);

  return (
    <>
      <Header
        title="Exercises"
        subheading="Search for exercises by name, keyword, muscle group, difficulty, or
        equipment."
      />
      <Container maxWidth="sm">
        <MovementPicker setMovements={setMovements} />
      </Container>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {/* {movements.length}  */}
          Search Results:
        </Typography>
        <Grid container spacing={4}>
          {movements.map((movement, i) => (
            <Grid item xs={6} sm={4} md={3} xl={3} key={i}
              styles={{ 
                height: '100%' }}
            >
              <MovementCard key={i} movement={movement} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Movements;
