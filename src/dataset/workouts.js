import moment from "moment";

import { movementTitles } from "./movements";
import { generateMovements } from "./movements";
import { generateUsers } from "./users";
import { generateReviews } from "./reviews";
import { selectRandom, selectRandomUnique } from "./helperMethods";

const generateAttendances = (quantity) => {
  const start = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    Math.floor(new Date().getDate() * Math.random() + 1),
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60)
  );
  let attendances = [];
  for (let i = 0; i < quantity; i++) {
    const arrival = moment(start)
      .add(Math.floor(Math.random() * 15), "m")
      .toDate();
    const departure = moment(arrival)
      .add(Math.floor(Math.random() * 25) + 20, "m")
      .toDate();
    const completion =
      Math.random < 0.8
        ? moment(arrival)
            .subtract(Math.floor(Math.random() * 10) + 2, "m")
            .toDate()
        : undefined;
    const attendance = {
      arrival,
      completion,
      departure,
    };
    attendances.push(attendance);
  }

  return attendances;
};

export const generateWorkoutPlans = (quantity) => {
  const generateTitle = () => {
    const difficulties = ["Difficult", "Easy", "Elite", "Recovery", "Beginner"];
    const modes = [
      "Mat",
      "Free Weight",
      "Bodyweight",
      "Pool",
      "Aerobic",
      "Outdoor",
    ];
    const regions = ["Push", "Pull", "Leg", "Full-Body"];
    return (
      selectRandom(difficulties) +
      " " +
      selectRandom(modes) +
      " " +
      selectRandom(regions) +
      " " +
      "Workout"
    );
  };
  let workouts = [];
  let reviews = [];
  for (let i = 0; i < quantity; i++) {
    const creator = generateUsers(1)[0];
    const leader = generateUsers(1)[0];
    const invitations = generateUsers(5);
    const exercises = generateMovements().map((movement, j) => {
      return {
        draggableId: j + 100,
        _id: (j + 100).toString(),
        movement,
        reps: 8 + Math.floor((Math.pow(Math.random(), 20) * 92) - (Math.pow(Math.random(), 10) * 7)),
        sets: 3 + Math.floor((Math.random() - Math.random()) * 2),
        resistance: Math.random() > 0.5 ? 0 : 25,
        index: j,
      };
    });
    const newWorkout = {
      _id: 100 + i,
      title: generateTitle(),
      creator,
      leader,
      invitations,
      exercises,
      bannedExercises: selectRandomUnique(
        movementTitles,
        Math.floor(
          Math.random() * 6,
          exercises.map((exercise) => exercise.movement)
        )
      ),
      description: "A randomly-generated workout for development purposes.",
      image: `https://picsum.photos/400?random=${i + 1}`,
      createdAt: new Date(),
    };
    workouts.push(newWorkout);
    generateReviews(newWorkout).forEach((review) => reviews.push(review));
  }
  return [workouts, reviews];
};

export const generateWorkoutSessions = (quantity) => {
  const plan = generateWorkoutPlans(1)[0];
  const attendanceCount = Math.floor(Math.random() * 20) + 2;
  const attendees = generateUsers(attendanceCount);
  const attendanceTiming = generateAttendances(attendanceCount);
  const session = {
    plan,
    attendees: attendees.map((attendee, i) => {
      return {
        user: attendee,
        arrival: attendanceTiming[i].arrival,
        completion: attendanceTiming[i].completion,
        departure: attendanceTiming[i].departure,
      };
    }),
    leaderNotes: [
      "This workout session went well.",
      "Those in attendance said this workout could use some core exercises.",
      "Turns out that not everybody has a punching bag - maybe swap in hula hooping instead.",
    ],
  };
  return session;
};
