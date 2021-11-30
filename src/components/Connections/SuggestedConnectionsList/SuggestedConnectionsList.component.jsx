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
  Tooltip,
} from "@mui/material";

import {
  Send as SendRequestIcon,
  CancelScheduleSend as WithdrawRequestIcon,
} from "@mui/icons-material";

const SuggestedConnectionsList = ({ suggestions = [], setSuggestions }) => {
  // event handlers

  const handleSendRequest = async (e, recipientId) => {
    // console.log("handleSendRequest invoked");
    e.preventDefault();
    try {
      const { data: confirmSent } = await createConnectionRequest(recipientId);
      if (confirmSent) {
        // console.log("connectionRequest successfully created.");
        // console.log("suggestions:");
        // console.dir(suggestions);
        setSuggestions((previous) => {
          const index = previous.findIndex(({suggestedUser}) => {
            return suggestedUser._id === confirmSent.recipient;
          });
          // console.log(`index: ${index}`);
          const modifiedUserToSpliceIn = {
            ...previous[index],
            requestStatus: "pending",
          };
          // console.log(`modifiedUserToSpliceIn: `);
          // console.dir(modifiedUserToSpliceIn);
          // console.log("previous:");
          // console.dir(previous);
          const newSuggestions = [...previous];
          newSuggestions.splice(index, 1, modifiedUserToSpliceIn);
          // console.log("newSuggestions:");
          // console.dir(newSuggestions);
          return newSuggestions;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdrawRequest = async (e, recipientId) => {
    e.preventDefault();
    // console.log('handleWithdrawRequest invoked');
    try {
      const { data: confirmDeleted } = await deleteConnectionRequest(
        recipientId
      );
      // console.log('confirmDeleted');
      // console.dir(confirmDeleted);
      if (confirmDeleted) {
        setSuggestions((previous) => {
          const index = previous.findIndex(({suggestedUser}) => {
            return suggestedUser._id === confirmDeleted.recipient;
          });
          // console.log(`index: ${index}`);
          const updatedSuggestion = {
            ...previous[index],
            requestStatus: undefined,
          };
          // console.log('updatedSuggestion:');
          // console.dir(updatedSuggestion);
          // console.log('previous:');
          // console.dir(previous);
          // const updatedSuggestions = [...previous].splice(index, 1, updatedSuggestion);
          const updatedSuggestions = [...previous.slice(0, index), updatedSuggestion, ...previous.slice(index + 1)];
          console.log('updatedSuggestions:');
          // console.dir(updatedSuggestions);
          return updatedSuggestions;
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
      {suggestions.map(({suggestedUser, requestStatus=undefined}, i) => {
        const labelId = `suggestion-list-label-${suggestedUser?._id}`;
        return (
          <ListItem
            key={i}
            disablePadding
            secondaryAction={
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (requestStatus !== "pending") {
                    handleSendRequest(e, suggestedUser._id);
                  } else {
                    handleWithdrawRequest(e, suggestedUser._id);
                  }
                }}
              >
                {requestStatus !== "pending" ? (
                  <Tooltip title="send connection request">
                    <SendRequestIcon edge="end" aria-label="delete" />
                    </Tooltip>
                ) : (
                  <Tooltip title="withdraw connection request">

                  <WithdrawRequestIcon
                    edge="end"
                    aria-label="awaiting response"
                    />
                    </Tooltip>
                )}
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={suggestedUser?.name} src={suggestedUser?.image} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={suggestedUser?.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SuggestedConnectionsList;
