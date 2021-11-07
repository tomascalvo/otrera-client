import React from "react";

// hooks

import useStyles from "./Stepper.styles";
import { useTheme } from "@mui/styles";

// components

import { MobileStepper, Step, StepLabel, Button } from "@mui/material";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const Stepper = ({ steps, activeStep, handleNext, handleBack }) => {
  // hooks

  const classes = useStyles();
  const theme = useTheme();

  if (steps === "error") {
    return null;
  }

  return (
    <MobileStepper
      variant="dots"
      steps={steps.length}
      position="static"
      activeStep={activeStep}
      className={classes.mobileStepper}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    >
      {steps.map((step, i) => (
        <Step key={i}>
          <StepLabel>
            {typeof step === "string"
              ? step
              : typeof step === "object"
              ? step?.movement?.title
              : "Unknown step type"}
          </StepLabel>
        </Step>
      ))}
    </MobileStepper>
  );
};

export default Stepper;
