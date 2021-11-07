import React from "react";

import { Typography, Grid, TextField, Button } from "@mui/material";

import FileBase from "react-file-base64";

import useStyles from "./DescriptionForm.styles";

const DescriptionForm = ({ planData = {}, setPlanData }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Workout Description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            label="Title"
            value={planData.title}
            onChange={(event) =>
              setPlanData({ ...planData, title: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            value={planData.description}
            onChange={(event) =>
              setPlanData({
                ...planData,
                description: event.target.value,
              })
            }
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            component="label"
            variant="contained"
            className={classes.fileUploadIcon}
          >
            <FileBase
              className={classes.fileInput}
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPlanData({ ...planData, image: base64 })
              }
            />
            {planData?.image ? "Change Image" : "Upload Image"}
          </Button>
          {planData?.image && (
            <img
              src={planData?.image}
              alt="Workout"
              className={classes.workoutImage}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DescriptionForm;
