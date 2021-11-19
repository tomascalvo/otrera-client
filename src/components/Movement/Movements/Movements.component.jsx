// hooks
import React, { useState } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./Movements.styles";

// components

import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

import Header from "../../Header/Header.component";
import MovementPicker from "./MovementPicker/MovementPicker.component";
import MovementCard from "./MovementCard/MovementCard.component";

const Movements = () => {

  // hooks
  const theme = useTheme();
  const classes = useStyles(theme);

  // state
  const defaultMovements = "loading...";
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
          Search Results:
        </Typography>
        {movements === "loading..." ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <CircularProgress style={{ margin: "150px auto" }} />
            </Grid>
          </Grid>
        ) : movements.length > 0 ? (
          <Grid container spacing={4}>
            {movements.map((movement, i) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                xl={3}
                key={i}
                styles={{
                  height: "100%",
                }}
              >
                <MovementCard
                  key={i}
                  cardIndex={i}
                  movement={movement}
                  setMovements={setMovements}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <Typography variant="body1">No movements found.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Movements;
