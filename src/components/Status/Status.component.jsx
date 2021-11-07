// hooks

import React from "react";
// import useStyles from "./Status.styles";

// components

import { Box, Container, Typography, Grid } from "@mui/material";

import BodyStatusPicker from "../BodyStatusPicker/BodyStatusPicker.component";

const Status = () => {
  // hooks
  // const classes = useStyles();

  // state

  // lifecycle

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Status
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Click a muscle to log its condition. Suggested workouts will be
            filtered to exercise fully-recovered muscles and avoid muscles that
            are fatigued, sore, injured, or impaired.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <BodyStatusPicker 
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Status;
