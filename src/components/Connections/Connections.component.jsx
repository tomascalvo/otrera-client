// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import { useHistory } from "react-router-dom";

// api

import { suggestConnections, createDyad, fetchDyads, fetchMyInbox } from "../../api/index";

// components

import {
  Grid,
  Stack,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

import Header from "../Header/Header.component";
import CurrentConnectionsList from "./CurrentConnectionsList/CurrentConnectionsList.component";
import SuggestedConnectionsList from "./SuggestedConnectionsList/SuggestedConnectionsList.component";
import Inbox from './Inbox/Inbox.component';

const Connections = () => {
  // hooks

  const history = useHistory();
  const theme = useTheme();

  // state

  const [currentConnections, setCurrentConnections] = useState(undefined);
  const [suggestedConnections, setSuggestedConnections] = useState(undefined);
  const [incoming, setIncoming] = useState(undefined);

  // lifecycle

  useEffect(() => {
    // onmount, fetch current connections, suggested connections, and inbound connection requests from api
    const getConnections = async () => {
      try {
        const { data } = await fetchDyads();
        // console.log('data:');
        // console.dir(data);
        setCurrentConnections(data);
      } catch (error) {
        setCurrentConnections([]);
        console.log(error);
      }
    };
    const getSuggestions = async () => {
      try {
        const { data } = await suggestConnections();
        setSuggestedConnections(data);
      } catch (error) {
        setSuggestedConnections([]);
        console.log(error);
      }
    };
    const getInbox = async () => {
      try {
        const { data } = await fetchMyInbox();
        console.dir(data);
        setIncoming(data);
      } catch (error) {
        setIncoming([]);
        console.log(error);
      }
    }
    getConnections();
    getSuggestions();
    getInbox();
  }, []);

  return (
    <>
      <Header
        title="Connections"
        subheading="Send and receive requests to make connections. Connected users can train together. Trainers can schedule workouts in their trainees' calendars."
      />
      <Grid
        container
        maxWidth="md"
        spacing={4}
        // sx={{ py: 8 }}
        style={{
          width: "100%",
          margin: "0 auto",
          // border: "1px solid magenta",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          style={{
            display: "block",
            justifyContent: "space-around",
            // border: "1px solid orange",
          }}
        >
          <Typography variant="h5">Current Connections</Typography>
          {!currentConnections ? (
            <CircularProgress style={{ margin: `${theme.spacing(2)} auto` }} />
          ) : currentConnections.length === 0 ? (
            <Stack direction="column">
              <Typography variant="body1" align="left">
                No connections.
              </Typography>
              <Button
                variant="contained"
                style={{ margin: `${theme.spacing(2)} auto` }}
              >
                Make Connections
              </Button>
            </Stack>
          ) : (
            <CurrentConnectionsList
              connections={currentConnections}
              setConnections={setCurrentConnections}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          style={
            {
              // border: "1px solid yellow"
            }
          }
        >
          <Typography variant="h5">Suggested Connections</Typography>
          {!suggestedConnections ? (
            <CircularProgress style={{ margin: `${theme.spacing(2)} auto` }} />
          ) : suggestedConnections.length === 0 ? (
            <Stack direction="column">
              <Typography variant="body1" align="left">
                No one else is working out. Get a head start.
              </Typography>
              <Button
                variant="contained"
                style={{ margin: `${theme.spacing(2)} auto` }}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/plans`);
                }}
              >
                Work Out
              </Button>
            </Stack>
          ) : (
            <SuggestedConnectionsList
              suggestions={suggestedConnections}
              setSuggestions={setSuggestedConnections}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          style={{
            display: "block",
            justifyContent: "space-around",
            // border: "1px solid orange",
          }}
        >
          <Inbox incoming={incoming} setIncoming={setIncoming} setSuggestions={setSuggestedConnections} setConnections={setCurrentConnections} />
        </Grid>
      </Grid>
    </>
  );
};

export default Connections;
