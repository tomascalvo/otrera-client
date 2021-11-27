import moment from "moment";

// hooks

import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./SessionDetails.styles";

// api

import { fetchSession } from "../../../api/index";

// components

import {
  CircularProgress,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Popover,
  CardContent,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  Avatar,
  TableBody,
  Typography,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  FitnessCenter as DumbbellIcon,
  Edit as EditIcon,
  PersonAdd as InviteIcon,
} from "@mui/icons-material";

import InvitationAutofill from './InvitationAutofill/InvitationAutofill.component';

// helper methods

import darkModeFilter from "../../../helperMethods/darkModeFilter";

import toTitleCase from "../../../helperMethods/toTitleCase";

const user = JSON.parse(localStorage.getItem("profile"))?.user;

const SessionDetails = () => {

  // hooks

  const { id: sessionId } = useParams();
  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const [session, setSession] = useState("loading...");
  const [inviteAnchorEl, setInviteAnchorEl] = useState(null);

  // lifecycle

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: session } = await fetchSession(sessionId);
        setSession(session);
      } catch (error) {
        console.log(error);
      }
    };
    getSession();
  }, [sessionId]);

  // event handlers

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("handleDelete invoked");
  };

  const handleOpenInvitePopover = async (e) => {
    e.preventDefault();
    console.log("handleInvitePopover invoked");
    setInviteAnchorEl(e.currentTarget);
  };

  const handleCloseInvitePopover = async (e) => {
    e.preventDefault();
    setInviteAnchorEl(null);
  };

  const open = Boolean(inviteAnchorEl);
  const popoverId = open ? 'invite-popover' : undefined;

  // render

  if (session === "loading...") {
    return <CircularProgress style={{ margin: "75px auto" }} />;
  }

  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <CardHeader
          title={`${session?.plan?.title} ${moment(session.startTime).format(
            "h:mm A MM/DD/YY"
          )}`}
        />
        <CardMedia
          className={classes.cardMedia}
          component="img"
          height="400"
          image={session.plan.image}
          alt={session.plan.title}
        />
        <CardActions disableSpacing>
          {!session.performances.find((performance) => {
            return performance.user._id === user._id;
          }) && (
            <IconButton>
              <DumbbellIcon />
            </IconButton>
          )}
          <Tooltip title="Invite Participant">
            <IconButton
              aria-describedby="invite participant"
              variant="contained"
              onClick={handleOpenInvitePopover}
            >
              <InviteIcon />
            </IconButton>
          </Tooltip>
          <Popover
                  id={popoverId}
                  open={open}
                  anchorEl={inviteAnchorEl}
                  onClose={handleCloseInvitePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
          >
            < InvitationAutofill />
          </Popover>
          {/* <IconButton>
            <EditIcon />
          </IconButton> */}
          <IconButton
            aria-label="share"
            onClick={handleDelete}
            style={{ marginLeft: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Table
            // sx={{ minWidth: 650 }}
            aria-label="performance table"
          >
            <TableHead>
              <TableRow>
                <TableCell>{/* Participant */}</TableCell>
                {session.plan.exercises.map((exercise, i) => (
                  <TableCell
                    // align="right"
                    align="center"
                    key={i}
                  >
                    <Tooltip title={toTitleCase(exercise.movement.title)}>
                      <Avatar
                        alt={exercise.movement.title}
                        src={exercise.movement.image}
                        style={{ filter: darkModeFilter(theme) }}
                      />
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {session.performances.map((performance, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Tooltip title={performance.user.name}>
                      <Avatar
                        alt={performance.user.name}
                        src={performance.user.image}
                      />
                    </Tooltip>
                  </TableCell>
                  {session.plan.exercises.map((exercise, i) => {
                    const attempt = performance.attempts.find((attempt) => {
                      return attempt.movement === exercise.movement._id;
                    });
                    const setsQuantity = attempt.sets.length;
                    let highestReps;
                    let lowestReps;
                    let highestResist;
                    let lowestResist;
                    for (let i = 0; i < setsQuantity; i++) {
                      const currentReps = attempt.sets[i].reps;
                      const currentResist = attempt.sets[i].resistance;
                      if (currentReps === 0) {
                        return;
                      }
                      if (
                        (currentReps && !highestReps) ||
                        currentReps > highestReps
                      ) {
                        highestReps = currentReps;
                      }
                      if (
                        (currentReps && !lowestReps) ||
                        currentReps < lowestReps
                      ) {
                        lowestReps = currentReps;
                      }
                      if (
                        (currentResist && !highestResist) ||
                        currentResist > highestResist
                      ) {
                        highestResist = currentResist;
                      }
                      if (
                        (currentResist && !lowestResist) ||
                        currentResist < lowestResist
                      ) {
                        lowestResist = currentResist;
                      }
                    }
                    return (
                      <Tooltip
                        title={`${performance.user.name} ${toTitleCase(
                          exercise.movement.title
                        )}`}
                        key={i}
                      >
                        <TableCell align="right" key={i}>
                          <Typography>
                            {lowestReps === highestReps
                              ? `${setsQuantity}/${highestReps}`
                              : `${setsQuantity}/${lowestReps}-${highestReps}`}
                          </Typography>
                          <Typography>
                            {!highestResist
                              ? ""
                              : lowestResist === highestResist
                              ? `${highestResist} lbs`
                              : `${lowestResist}-${highestResist} lbs`}
                          </Typography>
                        </TableCell>
                      </Tooltip>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SessionDetails;
