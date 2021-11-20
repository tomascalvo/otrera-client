// hooks
import React, { useState, useEffect, Suspense } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Plans.styles";

// components
import { Link } from "react-router-dom";
// import { DataGrid } from "@material-ui/data-grid";
import {
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import PlanCard from "./PlanCard/PlanCard.component";
import SessionsAlert from "./SessionsAlert/SessionsAlert.component";

import Header from "../../Header/Header.component";

// api
import { fetchPlans } from "../../../api/index";

const Plans = () => {
  // hooks

  const classes = useStyles();
  const history = useHistory();

  // state

  // const [defaultReviews] = generateWorkoutPlans(20)[1];
  const [workoutData, setWorkoutData] = useState([]);
  // const [listView, setListView] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [sessions, setSessions] = useState([]);

  // lifecycle

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchPlans();
      setWorkoutData(data);
    }
    fetchData();
  }, []);

  // const columns = [
  //   { field: "title", headerName: "Title", width: 200 },
  //   { field: "creator", headerName: "Creator", width: 180 },
  //   { field: "description", headerName: "Description", width: 180 },
  //   {
  //     field: "rating",
  //     headerName: "Rating",
  //     type: "number",
  //     width: 120,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "Created on",
  //     width: 180,
  //     type: "date",
  //   },
  // ];

  // const list = (
  //   <div style={{ height: 400, width: "100%" }}>
  //     <DataGrid
  //       rows={workoutData.map((row) => ({
  //         ...row,
  //         id: row._id,
  //         rating: defaultReviews
  //           .filter((review) => review.workout === row._id)
  //           .reduce(function (accumulator, currentReview, index, srcArray) {
  //             return accumulator + currentReview.overall / srcArray.length;
  //           }, 0)
  //           .toFixed(1),
  //       }))}
  //       columns={columns}
  //       pageSize={15}
  //       checkboxSelection
  //     />
  //   </div>
  // );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAlert}
        onClick={() => setOpenAlert(false)}
      >
        {openAlert && (
          <SessionsAlert
            sessions={sessions}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          />
        )}
      </Backdrop>
      <Header
        title="Workout Plans"
        subheading="Start a workout, schedule a workout for later or create a new
        workout plan. Filter by date created, scheduled start time, rating,
        muscle group, or estimated duration."
      />
      <div className={classes.container}>
        <Container maxWidth="sm">
          {workoutData.length < 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(`/workouts/create`);
              }}
              fullWidth
            >
              Be the first to author a workout plan.
            </Button>
          ) : (
            <Button
              component={Link}
              to="/workouts/create"
              variant="contained"
              color="primary"
              className={classes.link}
              fullWidth
            >
              Plan New Workout
            </Button>
          )}
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Suspense
          fallback={
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <CircularProgress style={{ margin: "150px auto" }} />
              </Grid>
            </Grid>
          }
        >
          {workoutData.length > 0 && (
            <Grid container spacing={4}>
              {workoutData.map((workout, i) => (
                <PlanCard
                  key={i}
                  workout={workout}
                  setWorkoutData={setWorkoutData}
                  setOpenAlert={setOpenAlert}
                  setSessions={setSessions}
                />
              ))}
            </Grid>
          )}
        </Suspense>
      </Container>
    </>
  );
};

export default Plans;
