// import hooks
import React, { useState, useEffect } from "react";
import useStyles from "./Review.styles";

// import components
import { DragDropContext } from "react-beautiful-dnd";
import FileBase from "react-file-base64";
import ReactStars from "react-rating-stars-component";
import {
  Typography,
  Grid,
  List,
  Button,
  TextField,
} from "@mui/material";
import ParticipantListItem from "../SchedulingForm/ParticipantListItem/ParticipantListItem.component";
import ExerciseColumn from "../ExercisesForm/ExerciseColumn/ExerciseColumn.component";
import ReviewLi from "./ReviewLi/ReviewLi.component";

// api

const Review = ({
  planData = "loading",
  setPlanData,
  editPlan,
  revert,
  reviews = null,
  isSession = false,
  isNew = true,
  sessionData = "loading",
  setSessionData,
}) => {
  // hooks
  const classes = useStyles();

  // state

  const [columns, setColumn] = useState({
    selections: {
      id: "selections",
      list: [],
    },
    options: {
      id: "options",
      list: [],
    },
  });

  // lifecycle

  // populate exercise D&D on mount

  useEffect(() => {
    if (planData !== "loading") {
      setColumn((prevColumn) => ({
        ...prevColumn,
        selections: {
          ...prevColumn.selections,
          list: planData?.exercises,
        },
      }));
    }
  }, []);

  // update planData on exercise D&D

  useEffect(() => {
    setPlanData((prevData) => ({
      ...prevData,
      exercises: columns.selections.list,
    }));
  }, [columns, setPlanData]);

  const onDragEnd = ({ source, destination }) => {
    console.log("source: ");
    console.dir(source);
    console.log("destination: ");
    console.dir(destination);

    // make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // make sure we're actually moving the item
    if (source.index === destination.index) return null;

    const start = columns["selections"];

    // move the item within the list

    // start by making a new list without the dragged item
    console.log(start);
    const newStartList = start.list.filter((_, idx) => idx !== source.index);

    // then insert the item at the right location
    newStartList.splice(destination.index, 0, start.list[source.index]);

    // then create a copy of the new column object
    const newCol = {
      id: start.id,
      list: newStartList.map((exercise, i) => ({ ...exercise, index: i })),
    };

    // update the state
    setColumn((prevColumn) => ({ ...prevColumn, [newCol.id]: newCol }));
  };

  // render

  if (planData === "loading" || sessionData === "loading") {
    return <h2>loading...</h2>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              id={"title"}
              name={"title"}
              label={"Title"}
              value={planData.title}
              onChange={editPlan}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id={"description"}
              name={"description"}
              label={"Description"}
              value={planData.description}
              onChange={editPlan}
              fullWidth
              multiline={true}
              rows={6}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.imageContainer}>
          <img
            className={classes.workoutImage}
            src={planData.image}
            alt={planData.title}
          />
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
                setPlanData((previous) => ({
                  ...previous,
                  image: base64,
                }))
              }
            />
            Change Image
          </Button>
        </div>
      </Grid>
      {isSession && (
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6">Invitations</Typography>
          {sessionData.invitees.length < 1 ? (
            <Typography variant="body1">
              No one has been invited to this workout yet.
            </Typography>
          ) : (
            <List disablePadding>
              {sessionData?.leader?._id && (
                <ParticipantListItem
                  user={sessionData.leader}
                  sessionData={sessionData}
                  setSessionData={setSessionData}
                />
              )}
              {sessionData?.invitees
                .filter(
                  (participant) => participant._id !== sessionData?.leader?._id
                )
                .map((nonLeader, i) => (
                  <ParticipantListItem
                    key={i}
                    user={nonLeader}
                    sessionData={sessionData}
                    setSessionData={setSessionData}
                  />
                ))}
            </List>
          )}
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={12}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Typography variant="h6">Exercises</Typography>
          {planData?.exercises === undefined ||
          columns.selections?.list === undefined ? (
            <Typography>loading...</Typography>
          ) : planData?.exercises.length < 1 ? (
            <Typography variant="body1">
              No exercises have been added to this workout yet.
            </Typography>
          ) : (
            <ExerciseColumn
              columns={columns}
              column={columns.selections}
              setColumns={setColumn}
              isSelected={true}
            />
          )}
        </DragDropContext>
      </Grid>
      {!isNew && (
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.starsContainer}>
            <Typography variant="h6">Reviews</Typography>
            {reviews !== null && (
              <ReactStars
                count={
                  reviews.reduce((accumulator, currentReview) => {
                    return accumulator + currentReview.overall;
                  }, 0) / reviews.length
                }
                edit={false}
                size="30"
              />
            )}
          </div>
          {(reviews === null || reviews?.length < 1) && (
            <Typography variant="body1">
              No reviews have been submitted for this workout yet.
            </Typography>
          )}

          {reviews !== null && reviews?.length >= 1 && (
            <>
              <List>
                {reviews.map((review, i) => (
                  <ReviewLi key={i} review={review} />
                ))}
              </List>
            </>
          )}
        </Grid>
      )}
      {revert && (
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => console.log("workout changes submitted")}
                fullWidth
                className={classes.button}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                variant="contained"
                onClick={revert}
                fullWidth
                className={classes.button}
              >
                Revert Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Review;
