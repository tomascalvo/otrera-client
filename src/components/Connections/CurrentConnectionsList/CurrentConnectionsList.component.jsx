import React from "react";

// hooks

import { useHistory } from 'react-router-dom';

// api

import { deleteDyad } from '../../../api/index.js';

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

import { PersonRemove as RemoveIcon } from "@mui/icons-material";

const user = JSON.parse(localStorage.getItem("profile")).user;

const CurrentConnectionsList = ({ connections, setConnections }) => {

  // hooks

  const history = useHistory();

  // event handlers

  const handleSeeDetails = (e, otherId) => {
    e.preventDefault();
    history.push(`/users/${otherId}`);
  };

  const handleDeleteConnection = async (e, dyadId) => {
    e.preventDefault();
    try {
      const { data: deletedConnection } = await deleteDyad(dyadId);
      console.log(`deletedConnection:`);
      console.dir(deletedConnection);
      setConnections((previous) => {
        return previous.filter((connection) => {
          return connection._id !== deletedConnection._id;
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  
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
      {connections.map((connection, i) => {
        const other = connection.monads.find((monad) => {
          return monad.user._id !== user._id;
        })?.user;
        const labelId = `connection-list-label-${other?._id}`;
        return (
          <ListItem
            key={i}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteConnection(e, connection._id)}>
                <RemoveIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={(e) => handleSeeDetails(e, other._id)}>
              <ListItemAvatar>
                <Avatar alt={other?.name} src={other?.image} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={other?.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CurrentConnectionsList;
