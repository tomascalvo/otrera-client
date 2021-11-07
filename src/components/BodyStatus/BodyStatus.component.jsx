// hooks
import React, { useState, useEffect } from "react";
import useStyles from "./BodyStatus.styles";

// components
import { Paper, Typography, Grid, Button } from "@mui/material";

import StatusSelect from "./StatusSelect/StatusSelect.component";

// api
import { fetchCurrentBodyStatusesByUser as fetchStatus, createBodyStatusesByUser as updateStatus } from "../../api/index";

const regionGroups = {
  upper: [
    "neck",
    "shoulder",
    "bicep",
    "tricep",
    "forearm",
    "hand",
    "chest",
    "abdomen",
    "upper back",
    "lower back",
  ],
  lower: ["gluteus", "hamstring", "quadricep", "lower leg", "foot"],
  other: ["neurological", "cardiorespiratory"],
};

const conditions = [
  "impaired",
  "injured",
  "sore (acute)",
  "sore (mild)",
  "fatigued",
  "recovered",
];

const BodyStatus = () => {
  // hooks
  const classes = useStyles();

  // state
  const [userId, setUserId] = useState("611ad7ae31690245d8dec0a7"); // HARD-CODED UNTIL USER AUTH IS DEVELOPED
  const [bodyStatus, setBodyStatus] = useState({});

  // lifecycle

  // fetch BodyStatus documents from db and assign them to state
  useEffect(() => {
    async function getStatus() {
        try {
            const { data: bodyStatusesObject } = await fetchStatus(userId);
            setBodyStatus(bodyStatusesObject);
        } catch (error) {
            console.log(error);
        }
    }
    getStatus();
  }, []);

  // event handlers
  const handleChange = (event) => {
      event.preventDefault();
    console.log(`BodyStatus.component handleChange(event) invoked. event.target: ${event.target}`);
    setBodyStatus((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Requesting BodyStatus posts: ', bodyStatus);
    const { data } = await updateStatus(userId, bodyStatus);
    console.log('BodyStatus successfully posted', data);
  }

  const regionGroupDisplay = (title, regions) => (
    <>
      <Typography component="h2" variant="h6" align="left">
        {title}
      </Typography>
      <div className={classes.regionGroup}>
        {regions.map((region, i) => (
          <StatusSelect
            key={i}
            region={region}
            conditions={conditions}
            bodyStatus={bodyStatus}
            handleChange={handleChange}
          />
        ))}
      </div>
    </>
  );

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          My Body Status
        </Typography>
        <Grid container spacing={3}>
          {Object.keys(regionGroups).map((objKey, i) => (
            <Grid item xs={12} key={i}>
              {regionGroupDisplay(objKey, regionGroups[objKey])}
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={handleSubmit}
        >
          Update Status
        </Button>
      </Paper>
    </main>
  );
};

export default BodyStatus;
