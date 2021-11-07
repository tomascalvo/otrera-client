import React, { useState, useEffect } from "react";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  ArrowUpward as LeaderIcon,
  ArrowDownward as DemotionIcon,
  Clear as ClearIcon,
} from "@material-ui/icons";

import useStyles from "./ParticipantListItem.styles";

const ParticipantListItem = ({
  user,
  sessionData: { invitees = [], leader },
  setSessionData,
}) => {
  const [isInvited, setIsInvited] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  const classes = useStyles();

  // lifecycle

  // check to see if the participant is invited, is leader

  useEffect(() => {
    setIsInvited(
      invitees.find((invitee) => invitee._id === user._id)
    );
    setIsLeader(leader?._id === user._id);
  }, [user, invitees, leader]);

  return (
    <ListItem ContainerComponent="div">
      <ListItemAvatar>
        <Avatar src={user.image} alt={`Avatar of ${user.name}`} />
      </ListItemAvatar>
        <Typography component={Typography} color={isLeader ? "primary" : "textPrimary"}>{`${user.name} ${
          isLeader ? "(Leader)" : ""
        }`}</Typography>
      <ListItemSecondaryAction className={classes.participantButtons}>
        {!isInvited && (
          <Tooltip title="Invite" aria-label="add">
            <IconButton
              edge="end"
              aria-label="Invite"
              onClick={() =>
                setSessionData((prevData) => ({
                  ...prevData,
                  invitees: [...invitees, user],
                }))
              }
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        {!isLeader && (
          <Tooltip title="Promote to Leader" aria-label="Promote to Leader">
            <IconButton
              edge="end"
              aria-label="Promote to Leader"
              onClick={() => {
                setSessionData((previous) => {
                  let updatedInvitees = previous?.invitees;
                  if (!isInvited) {
                    updatedInvitees = [...previous?.invitees, user];
                  }

                  return {
                    ...previous,
                    invitees: updatedInvitees,
                    leader: user,
                  };
                });
              }}
            >
              <LeaderIcon />
            </IconButton>
          </Tooltip>
        )}
        {isLeader && (
          <Tooltip title="Demote Leader" aria-label="Demote Leader">
            <IconButton
              edge="end"
              onClick={() =>
                setSessionData((prevData) => ({
                  ...prevData,
                  leader: undefined,
                }))
              }
            >
              <DemotionIcon />
            </IconButton>
          </Tooltip>
        )}
        {isInvited && (
          <Tooltip title="Remove" aria-label="Remove">
            <IconButton
              edge="end"
              onClick={() =>
                setSessionData((prevData) => ({
                  ...prevData,
                  invitees: invitees.filter((invitedUser) => {
                    return invitedUser._id !== user._id;
                  }),
                  leader:
                    leader === undefined || leader._id === user._id
                      ? undefined
                      : leader,
                }))
              }
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ParticipantListItem;
