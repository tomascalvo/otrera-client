import React from "react";
import moment from "moment";

// hooks

// components

import WorkoutPreview from "./WorkoutPreview/WorkoutPreview.component";
import WorkoutConclusion from "./WorkoutConclusion/WorkoutConclusion.component";
import ExerciseLog from "./ExerciseLog/ExerciseLog.component";

const Rundown = ({
  performance,
  setPerformance,
  steps,
  activeStep,
  handleNext,
  handleBack,
}) => {
  // event handlers

  function handleSetChange(e) {
    e.preventDefault();
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    const sets = currentAttempt?.sets;
    const setIndex = parseInt(e.target.id.charAt(0));
    const currentSet = currentAttempt.sets[setIndex];
    const parse = (value) => {
      const parsed = parseInt(value);
      if (isNaN(parsed)) { return ""; }
      return parsed;
    }
    const updatedSet = {
      ...currentSet,
      attempted:
        currentSet.attempted === undefined ? new Date() : currentSet.attempted,
      resistance: e.target.id.includes("resistance")
        ? parse(e.target.value)
        : currentSet.resistance,
      reps: e.target.id.includes("reps")
        ? parse(e.target.value)
        : currentSet.reps,
    };
    sets.splice(setIndex, 1, updatedSet);
    const updatedAttempt = {
      ...currentAttempt,
      sets: sets.map((set, i) => {
        if (i > setIndex) {
          return {
            ...set,
            resistance: updatedSet.resistance,
          }
        } else {
          return set;
        }
      }),
    };
    attempts.splice([activeStep - 1], 1, updatedAttempt);
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  function clearSet(setIndex) {
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    const sets = currentAttempt?.sets;
    const currentSet = currentAttempt[setIndex];
    const updatedSet = {
      ...currentSet,
      reps: 0,
    };
    sets.splice(setIndex, 1, updatedSet);
    const updatedAttempt = {
      ...currentAttempt,
      sets,
    };
    attempts.splice([activeStep - 1], 0, updatedAttempt);
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  function removeSet(setIndex) {
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    const sets = currentAttempt.sets;
    sets.splice(setIndex, 1);
    const updatedAttempt = {
      ...currentAttempt,
      sets,
    };
    attempts.splice([activeStep - 1], 0, updatedAttempt);
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  function addSet() {
    console.log(`Rundown.component.jsx invokes addSet()`);
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    console.log(`currentAttempt:`);
    console.dir(currentAttempt);
    const updatedAttempt = {
      ...currentAttempt,
      sets: [
        ...currentAttempt.sets,
        {
          // make starting resistance 45 if it's a barbell exercise and the workout plan has no recommended resistance and the previous set has no resistance specified
          resistance:
            currentAttempt?.EDBmovement?.equipment === "barbell" ||
            currentAttempt?.movement?.equipment === "barbell"
              ? 45
              : currentAttempt?.sets[currentAttempt?.sets.length]?.resistance ||
                currentAttempt?.resistance,
          reps: 0,
        },
      ],
    };
    attempts.splice([activeStep - 1], 1, updatedAttempt);
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  function completeSet(setIndex, resistance) {
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    const sets = currentAttempt.sets;
    const currentSet = currentAttempt.sets[setIndex];
    const updatedSet = {
      ...currentSet,
      reps: currentAttempt.exercise?.reps || 5,
      resistance: resistance,
      attempted: new Date(),
    };
    // console.log("updatedSet: ", updatedSet);
    sets.splice(setIndex, 1, updatedSet);
    // console.log("sets: ", sets);
    const updatedAttempt = {
      ...currentAttempt,
      sets,
    };
    // console.log("updatedAttempt: ", updatedAttempt);
    attempts.splice([activeStep - 1], 1, updatedAttempt);
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  function completeExercise() {
    const attempts = performance.attempts;
    const currentAttempt = attempts[activeStep - 1];
    let sets = currentAttempt.sets || [];
    sets = sets.map((set, i) => ({
      ...set,
      reps: currentAttempt.exercise?.reps || 5,
      resistance:
        set?.resistance !== undefined
          ? set?.resistance
          : currentAttempt.sets[
              currentAttempt.sets.findIndex((set) => {
                return set?.resistance !== undefined;
              })
            ]?.resistance || 0,
      attempted:
        set.attempted ||
        moment()
          .add(1 * i, "seconds")
          .toDate(),
    }));
    if (sets.length < currentAttempt.exercise?.sets) {
      for (let i = 0; i < currentAttempt.exercise.sets - sets.length; i++) {
        sets.push({
          reps: currentAttempt.exercise.reps,
          resistance: currentAttempt.exercise.resistance,
        });
      }
    }
    // update attempt with updated sets
    const updatedAttempt = {
      ...currentAttempt,
      sets,
    };
    // splice in updated attempt
    attempts.splice([activeStep - 1], 1, updatedAttempt);
    // update performance state with updated attempts
    setPerformance((previous) => ({
      ...previous,
      attempts,
    }));
  }

  return (
    <>
      {activeStep === 0 ? (
        <WorkoutPreview performance={performance} />
      ) : activeStep < steps.length - 1 ? (
        <ExerciseLog
          // performance props
          performance={performance}
          handleSetChange={handleSetChange}
          completeSet={completeSet}
          clearSet={clearSet}
          addSet={addSet}
          removeSet={removeSet}
          completeExercise={completeExercise}
          // steps props
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ) : (
        <WorkoutConclusion performance={performance} />
      )}
    </>
  );
};

export default Rundown;
