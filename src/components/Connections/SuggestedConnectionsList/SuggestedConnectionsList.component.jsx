import React from "react";

// api

import {
  createConnectionRequest,
  deleteConnectionRequest,
} from "../../../api/index";

// components

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";

import {
  PersonAdd as SendRequestIcon,
  CancelScheduleSend as WithdrawRequestIcon,
} from "@mui/icons-material";

const SuggestedConnectionsList = ({ suggestions = [], setSuggestions }) => {
  // event handlers

  const handleSendRequest = async (e, recipientId) => {
    console.log("handleSendRequest invoked");
    e.preventDefault();
    try {
      const { data: confirmSent } = await createConnectionRequest(recipientId);
      if (confirmSent) {
        console.log(
          "connectionRequest successfully created."
        );
        console.log('suggestions:');
        console.dir(suggestions);
        setSuggestions((previous) => {
          const index = previous.findIndex((suggestion) => {
            return suggestion._id === confirmSent.recipient;
          });
          console.log(`index: ${index}`);
          const modifiedUserToSpliceIn = {
            ...previous[index],
            requestSent: true,
          };
          console.log(`modifiedUserToSpliceIn: `);
          console.dir(modifiedUserToSpliceIn);
          console.log('previous:');
          console.dir(previous);
          const newSuggestions = [...previous];
          newSuggestions.splice(index, 1, modifiedUserToSpliceIn);
          console.log("newSuggestions:");
          console.dir(newSuggestions);
          return newSuggestions;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdrawRequest = async (e, recipientId) => {
    e.preventDefault();
    try {
      const { data: confirmDeleted } = await deleteConnectionRequest(
        recipientId
      );
      if (confirmDeleted) {
        setSuggestions((previous) => {
          const index = previous.findIndex((suggestion) => {
            return suggestion._id === confirmDeleted.recipient;
          });
          return [...previous].splice(index, 1, {
            ...previous[index],
            requestSent: false,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // render

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {suggestions.map((suggestion, i) => {
        const labelId = `suggestion-list-label-${suggestion?._id}`;
        return (
          <ListItem
            key={i}
            disablePadding
            secondaryAction={
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (!suggestion?.requestSent) {
                    handleSendRequest(e, suggestion._id);
                  } else {
                    handleWithdrawRequest(e, suggestion._id);
                  }
                }}
              >
                {!suggestion?.requestSent ? (
                  <SendRequestIcon edge="end" aria-label="delete" />
                ) : (
                  <WithdrawRequestIcon
                    edge="end"
                    aria-label="awaiting response"
                  />
                )}
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={suggestion?.name} src={suggestion?.image} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={suggestion?.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SuggestedConnectionsList;
