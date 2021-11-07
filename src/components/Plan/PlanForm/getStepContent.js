import { Typography, FormControlLabel, Checkbox } from "@mui/material";

import DescriptionForm from "./DescriptionForm/DescriptionForm.component";
import ExercisesForm from "./ExercisesForm/ExercisesForm.component";
import SchedulingForm from "./SchedulingForm/SchedulingForm.component";
import Review from "./ReviewStep/Review.component";
import Confirmation from "./Confirmation/Confirmation.component";

function getStepContent({
  steps,
  step,
  isSession,
  setIsSession,
  planData,
  setPlanData,
  classes,
  sessionData,
  setSessionData,
  handleReset,
}) {
  switch (step) {
    case 0:
      return <DescriptionForm planData={planData} setPlanData={setPlanData} />;
    case 1:
      return (
        <>
          <Typography variant="body2" className={classes.instructions}>
            Invite participants to the workout session, designate a leader, and
            set the start time. This step is optional - skip it to create a
            workout plan without scheduling a workout session.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSession}
                onChange={(e) => {
                  setIsSession((previous) => !previous);
                }}
                name="isSession"
                color="primary"
              />
            }
            label="Schedule Workout Session"
            className={classes.checkbox}
          />
          {isSession && (
            <SchedulingForm
              planData={planData}
              sessionData={sessionData}
              setSessionData={setSessionData}
            />
          )}
        </>
      );
    case 2:
      return <ExercisesForm planData={planData} setPlanData={setPlanData} />;
    case 3:
      return (
        <Review
          planData={planData}
          setPlanData={setPlanData}
          isNew
          isSession={isSession}
          sessionData={sessionData}
          setSessionData={setSessionData}
        />
      );
    case 4:
      return (
        <Confirmation
          plan={planData}
          isSession={isSession}
          session={sessionData}
          handleReset={handleReset}
        />
      );
    default:
      throw new Error("Unknown WorkoutForm step");
  }
}

export default getStepContent;
