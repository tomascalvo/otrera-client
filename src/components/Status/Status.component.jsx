// hooks

import React from "react";
// import useStyles from "./Status.styles";

// components

import { Container, Grid } from "@mui/material";

import Header from "../Header/Header.component";
import BodyStatusPicker from "../BodyStatusPicker/BodyStatusPicker.component";

const Status = () => {
  // hooks
  // const classes = useStyles();

  // state

  // lifecycle

  return (
    <>
      <Header
        title="Status"
        subheading="Click a muscle to log its condition. Suggested workouts will be
            filtered to exercise fully-recovered muscles and avoid muscles that
            are fatigued, sore, injured, or impaired."
      />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <BodyStatusPicker />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Status;
