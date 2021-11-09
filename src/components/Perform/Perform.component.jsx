import { socket } from "./socket";

// hooks

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./Perform.styles";
import { useTheme } from "@mui/styles";

// components

import { Paper, Typography, Hidden, Grid, useMediaQuery } from "@mui/material";

import Stepper from "./Stepper/Stepper.component";
import Rundown from "./Rundown/Rundown.component";
import Chat from "./Chat/Chat.component";
import ChatDialog from "./Chat/ChatDialog/ChatDialog.component";
import ChatFAB from "./ChatFAB/ChatFAB.component";

// api

import { fetchSession, createPerformance } from "../../api/index";

// methods

// import findMovement from "./findMovement";

const Perform = () => {
  // hooks

  const classes = useStyles();
  let { id: sessionId } = useParams();
  const theme = useTheme();
  const mediumUpWindow = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();

  // state

  const user = JSON.parse(localStorage.getItem("profile"))?.user;
  const [session, setSession] = useState("loading");
  const [performance, setPerformance] = useState({
    user,
    session: {
      plan: {
        exercises: [],
      },
      invitees: [],
    },
    attempts: [],
    completed: false,
  });

  // steps

  const defaultSteps = ["Overview", "Review"];
  const [steps, setSteps] = useState(defaultSteps);
  const [activeStep, setActiveStep] = useState(0);

  // chat

  // const ENDPOINT = "localhost:7000";
  // const [socket, setSocket] = useState(io(ENDPOINT));
  // const socket = io(ENDPOINT);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [composition, setComposition] = useState("");
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  // lifecycle

  // push to signin page if no profile in localStorage

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      history.push("/auth");
    }
  }, [history]);

  // fetch session from sessionId param

  useEffect(() => {
    // fetch session from sessionId param

    const fetchSessionData = async () => {
      try {
        const { data: sessionData } = await fetchSession(sessionId);
        // console.log("sessionData: ", sessionData);
        setSession(sessionData);

        // emit socket join

        socket.emit(
          "join",
          {
            user,
            session: sessionData,
            step: {
              ...steps[activeStep],
              index: activeStep,
              name:
                typeof steps[activeStep] === "string"
                  ? steps[activeStep]
                  : steps[activeStep]?.movement?.name,
            },
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );

        // fetch exercise data for each exercise in plan

        // const exerciseData = await Promise.all(
        //   sessionData.plan.exercises.map(async (exercise) => {
        //     const movement = await findMovement(exercise);
        //     return {
        //       ...exercise,
        //       movement,
        //     };
        //   })
        // );

        // console.log("exerciseData: ", exerciseData);

        // replace array of exercise ids with populated movement data

        // const conformedSession = {
        //   ...sessionData,
        //   plan: {
        //     ...sessionData.plan,
        //     exercises: exerciseData,
        //   },
        // };

        // setSession(conformedSession);

        // load attempts with default sets/reps/resistance into performance

        const attempts = sessionData.plan.exercises.map((exercise) => {
          let attemptSets = [];
          const setsQuantity = exercise?.sets || 3;
          for (let i = 0; i < setsQuantity; i++) {
            attemptSets.push({
              resistance: (exercise?.EDBmovement?.equipment === "barbell" || exercise?.movement?.equipment === "barbell") ? 45 : (exercise?.EDBmovement?.equipment === "dumbbell" || exercise?.movement?.equipment === "dumbbell") ? 5 : undefined,
              reps: undefined,
            });
          }
          const newAttempt = {
            EDBmovement: exercise?.EDBmovement,
            movement: exercise?.movement,
            sets: attemptSets,
          };
          return newAttempt;
        });

        // set state

        setPerformance((previous) => ({
          ...previous,
          session: sessionData,
          attempts,
        }));

        setSteps((previous) => [
          previous[0],
          ...sessionData?.plan?.exercises,
          previous[previous.length - 1],
        ]);
      } catch (error) {
        console.log(error);
        setSession("error");
        setPerformance("error");
        setSteps("error");
      }
    };

    // execute async functions
    fetchSessionData();
  }, [sessionId]);

  // accept socket emit sendMessage

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("message", (message) => {
        console.log(`message received: ${message}`);
        setMessages((previous) => [...previous, message]);
      });
      socket.on("roomData", ({ users }) => {
        setParticipants(
          users.map((el) => {
            return {
              ...el,
              isOnline: true,
            };
          })
        );
      });
      socket.on("stepData", ({ updatedParticipant }) => {
        setParticipants((previous) => {
          return previous.map((el) => {
            if (el._id === updatedParticipant._id) {
              return updatedParticipant;
            } else {
              return el;
            }
          });
        });
      });
    }
  }, [setParticipants, setMessages]);

  // close chat dialog if window is medium or larger

  useEffect(() => {
    if (mediumUpWindow) {
      setChatDialogOpen(false);
    }
  }, [mediumUpWindow]);

  // event handlers

  const postPerformance = async () => {
    const performanceBody = {
      user: performance.user._id,
      session: performance.session._id,
      attempts: performance.attempts
        .filter((attempt) => {
          return attempt.sets.some((set) => {
            return set?.reps !== undefined;
          });
        })
        .map((attempt) => ({
          movement: attempt?.movement?._id,
          EDBmovement: attempt?.EDBmovement?.id,
          sets: attempt.sets
            .filter((set) => {
              return set?.reps !== undefined;
            })
            .map((set) => ({
              ...set,
              resistance: set?.resistance ? set?.resistance : 0,
            })),
        })),
      completed: new Date(),
    };
    console.log("Perform.component sending post request to db with body: ", performanceBody);
    const { data: confirmation } = await createPerformance(performanceBody);
    console.log("Performance saved to db: ", confirmation);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 2) {
      postPerformance();
    }
    socket.emit("stepData", {
      step: {
        ...steps[activeStep + 1],
        index: activeStep + 1,
        name:
          typeof steps[activeStep + 1] === "string"
            ? steps[activeStep + 1]
            : steps[activeStep + 1]?.movement?.name,
      },
    });
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    socket.emit("stepData", {
      step: {
        ...steps[activeStep - 1],
        index: activeStep - 1,
        name:
          typeof steps[activeStep - 1] === "string"
            ? steps[activeStep - 1]
            : steps[activeStep - 1]?.movement?.name,
      },
    });
    setActiveStep(activeStep - 1);
  };

  const handleSubmitMessage = (e) => {
    console.log("message submitted");
    console.log("socket.id: ", socket.id);
    console.log("session._id: ", session._id);
    e.preventDefault();
    if (composition.length > 0) {
      socket.emit("sendMessage", { text: composition }, () =>
        setComposition("")
      );
    }
  };

  const handleOpenChat = () => {
    setChatDialogOpen(true);
  };

  const handleCloseChat = () => {
    setChatDialogOpen(false);
  };

  // render

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {performance.session?.plan?.title}
        </Typography>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            md={performance?.session?.invitees?.length > 1 ? 6 : 12}
            lg={performance?.session?.invitees?.length > 1 ? 4 : 12}
          >
            <Rundown
              performance={performance}
              setPerformance={setPerformance}
              steps={steps}
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </Grid>
          {performance?.session?.invitees?.length > 1 && (
            <Hidden smDown>
              <Grid item sm={12} md={6} lg={8}>
                <Chat
                  user={user}
                  participants={
                    session?.invitees
                      ? session?.invitees.map((invitee) => {
                        const participant = participants.find(
                          (participant) => {
                            return participant._id === invitee._id;
                          }
                        );
                        // console.log('participant: ', participant);
                        return {
                          ...invitee,
                          isOnline: participant,
                          step: participant?.step,
                        };
                      })
                      : "loading"
                  }
                  messages={messages}
                  composition={composition}
                  setComposition={setComposition}
                  handleSubmitMessage={handleSubmitMessage}
                />
              </Grid>
            </Hidden>
          )}
        </Grid>
        {performance?.session?.invitees?.length > 1 && !chatDialogOpen && (
          <Hidden mdUp>
            <ChatFAB onClick={handleOpenChat} />
          </Hidden>
        )}
        <ChatDialog
          user={user}
          participants={
            session?.invitees
              ? session?.invitees.map((invitee) => {
                const participant = participants.find((participant) => {
                  return participant._id === invitee._id;
                });
                console.log(`Perform.component participant:`);
                console.dir(participant);
                return {
                  ...invitee,
                  isOnline: participant?.isOnline,
                  step: participant?.step,
                };
              })
              : "loading"
          }
          messages={messages}
          composition={composition}
          setComposition={setComposition}
          handleSubmitMessage={handleSubmitMessage}
          open={chatDialogOpen}
          handleClose={handleCloseChat}
        />
      </Paper>
    </main>
  );
};

export default Perform;
