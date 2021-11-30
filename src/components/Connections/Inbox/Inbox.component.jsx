import React from "react";

// hooks

import { useTheme } from "@mui/styles";

// api

import { approveRequest, denyRequest } from "../../../api/index";

// components

import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Tooltip,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import {
  PersonAddAlt1 as ApproveIcon,
  PersonOff as DenyIcon,
} from "@mui/icons-material";

const Inbox = ({ incoming, setIncoming, setSuggestions, setConnections }) => {
  // hooks

  const theme = useTheme();

  // event handlers

  const spliceOutRequest = (updatedRequest) => {
    setIncoming((previous) => {
      const index = previous.findIndex((request) => {
        return request._id === updatedRequest._id;
      });
      const newIncoming = [...previous];
      newIncoming.splice(index, 1);
      return newIncoming;
    });
  };

  const spliceOutSuggestion = (senderId) => {
    setSuggestions((previous) => {
      const index = previous.findIndex(({ suggestedUser }) => {
        return suggestedUser._id === senderId;
      });
      const newSuggestions = [...previous];
      newSuggestions.splice(index, 1);
      return newSuggestions;
    });
  };

  const handleApproval = async (e, requestId) => {
    e.preventDefault();
    try {
      const {
        data: { approvedRequest, newConnection },
      } = await approveRequest(requestId);
      if (approvedRequest) {
        spliceOutRequest(approvedRequest);
        spliceOutSuggestion(approvedRequest.sender);
        setConnections((previous) => {
          return [newConnection, ...previous];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDenial = async (e, requestId) => {
    e.preventDefault();
    try {
      const { data: deniedRequest } = await denyRequest(requestId);
      if (deniedRequest) {
        spliceOutRequest(deniedRequest);
        spliceOutSuggestion(deniedRequest.sender);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // render

  return (
    <>
      <Typography variant="h5">Inbox</Typography>
      {!incoming ? (
        <CircularProgress style={{ margin: `${theme.spacing(2)} auto` }} />
      ) : incoming.length === 0 ? (
        <Typography variant="body1" align="left">
          You have no pending connection requests.
        </Typography>
      ) : (
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {incoming.map((incomingRequest, i) => {
            const labelId = `incoming-list-label-${incomingRequest?._id}`;
            return (
              <ListItem
                key={i}
                disablePadding
                secondaryAction={
                  <>
                    <Tooltip title="approve connection request">
                      <IconButton
                        onClick={(e) => handleApproval(e, incomingRequest._id)}
                      >
                        <ApproveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="deny connection request">
                      <IconButton
                        onClick={(e) => handleDenial(e, incomingRequest._id)}
                      >
                        <DenyIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt={incomingRequest?.sender?.name}
                    src={incomingRequest?.sender?.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={incomingRequest?.sender?.name}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default Inbox;
