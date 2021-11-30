import React from "react";

import { useTheme } from "@mui/styles";

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

const Inbox = ({ incoming }) => {
  const theme = useTheme();
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
                      <IconButton>
                        <ApproveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="deny connection request">
                      <IconButton>
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
