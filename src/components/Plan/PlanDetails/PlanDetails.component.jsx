// import hooks
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./PlanDetails.styles";

// import components
import Review from "../PlanForm/ReviewStep/Review.component";
import { Paper, Typography } from "@mui/material";

// import api calls
import { fetchPlan } from '../../../api/index';

const PlanDetails = () => {
  // hooks
  const classes = useStyles();
  let { id: planId } = useParams();

  // state
  // const [reviews, setReviews] = useState([]);
  const [plan, setPlan] = useState(undefined);
  const [editablePlan, setEditablePlan] = useState(undefined);

  // lifecycle
  useEffect(() => {
    async function fetchData() {
      const { data: planData } = await fetchPlan(planId);
      const populatedPlan = {
        ...planData,
        exercises: planData.exercises.map((el) => {
          return {
            ...el,
            exercise: {
              ...el.exercise,
              movement: JSON.parse(localStorage.getItem("EDBmovements")).find((movement) => {
                return movement.id === el.exercise.EDBmovement;
              })
            }
          }
        })
      }
      setPlan(populatedPlan);
      setEditablePlan(populatedPlan);
    }
    fetchData().catch((error) => {
      console.log(error);
      setPlan("error");
      setEditablePlan("error");
    });
  }, [planId]);

  const editPlan = (e) => {
    e.preventDefault();
    setEditablePlan((previous) => ({
      ...previous,
      [e.target.name]: e.target.value
    }))
  };
  
  const revert = (e) => {
    e.preventDefault();
    setEditablePlan(plan);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Workout Plan
        </Typography>
        {editablePlan !== null && (
          <Review
            planData={editablePlan}
            setPlanData={setEditablePlan}
            editPlan={editPlan}
            revert={revert}
            // reviews={reviews || []}
            isSession={false}
            sessionData={null}
          />
        )}
      </Paper>
    </main>
  );
};

export default PlanDetails;
