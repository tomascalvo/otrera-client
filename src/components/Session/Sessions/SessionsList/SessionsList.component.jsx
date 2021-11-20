import React from "react";
import moment from "moment";

// hooks

import { useTheme } from "@mui/styles";
import useStyles from "./SessionsList.styles";

// components

import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";

const SessionsList = ({
  sessions = "loading",
  handleOnClick = {
    function() {
      console.log("SessionsList ListItem clicked");
    },
  },
}) => {
  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // render

  if (sessions === "loading") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <CircularProgress style={{ margin: "150px auto" }} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Container style={{ padding: 0 }} maxWidth="md">
      {sessions.length < 1 ? (
        <Typography sx={{ m: `${theme.spacing(1)} 0` }} >No sessions.</Typography>
      ) : (
        <List aria-label="workout sessions">
          {sessions.map((session, i) => (
            <ListItem
              button
              onClick={() => handleOnClick(session.id)}
              key={i}
              alignItems="flex-start"
              disableGutters
            >
              <ListItemAvatar>
                <Avatar
                  alt="workout"
                  src={session?.plan?.image}
                  className={
                    session?.plan?.image.includes(
                      "d205bpvrqc9yn1.cloudfront.net"
                    )
                      ? classes.gifUrl
                      : ""
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={session?.plan?.title}
                secondary={`${moment(session.startTime).format("MM/DD/YY LT")}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SessionsList;
