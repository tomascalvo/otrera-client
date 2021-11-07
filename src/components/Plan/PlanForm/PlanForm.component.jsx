// hooks

import React, { useState } from "react";
import useStyles from "./PlanForm.styles";
import moment from "moment";

// components

import {
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";

import getStepContent from "./getStepContent";

// api

import { createPlan } from "../../../api/index";

const steps = ["Description", "Invitations", "Exercises", "Review Workout"];

const PlanForm = () => {
  // hooks

  const classes = useStyles();

  // state

  const user = JSON.parse(localStorage.getItem("profile"))?.user;

  const defaultPlan = {
    title: "",
    creator: user._id,
    description: "",
    image: "",
    exercises: [],
  };

  const defaultSession = {
    plan: "",
    creator: user._id,
    leader: "",
    invitees: [],
    startTime: moment().add(1, "days").startOf("day").hours(5),
    estimatedDuration: 45,
  };

  const [planData, setPlanData] = useState(defaultPlan);
  const [sessionData, setSessionData] = useState(defaultSession);
  const [isSession, setIsSession] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // event handlers

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    const submissionData = {
      plan: {
        ...planData,
        exercises: planData.exercises.map((exercise, i) => ({
          ...exercise,
          movement: exercise?.movement?._id,
          EDBmovement: exercise?.EDBmovement?.id,
        })),
      },
      session: {
        ...sessionData,
        invitees: sessionData?.invitees.map((invitee) => invitee._id),
        leader: sessionData?.leader._id,
      },
    };

    console.log("Plan data to post:", submissionData);
    await createPlan(submissionData)
      .then(({ data: confirmation }) => {
        console.log("Workout saved. Payload: ", confirmation);
        setPlanData((previous) => ({
          ...previous,
          _id: confirmation._id,
        }));
        setSessionData((previous) => ({
          ...previous,
          _id: confirmation.session,
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Resetting plan form and returning to step 0.");
    setActiveStep(0);
    setPlanData(defaultPlan);
    setSessionData(defaultSession);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          New Workout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent({
          steps,
          step: activeStep,
          isSession,
          setIsSession,
          planData,
          setPlanData,
          classes,
          sessionData,
          setSessionData,
          handleReset,
        })}
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? "Finalize Workout Plan" : "Next"}
          </Button>
        </div>
      </Paper>
    </main>
  );
};

export default PlanForm;
