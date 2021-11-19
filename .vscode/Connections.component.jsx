// hooks

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import { useHistory } from 'react-router-dom';

// api

import { suggestConnections, createDyad, fetchDyads } from '../../api/index';

// components

import { Container, Grid, Stack, CircularProgress, Typography, Card, Button } from '@mui/material';

import Header from '../Header/Header.component';

const user = JSON.parse(localStorage.getItem('user'));

const Connections = () => {

  // hooks

  const history = useHistory();
  const theme = useTheme();

  // state

  const [connections, setConnections] = useState(undefined);
  const [suggestions, setSuggestions] = useState(undefined);

  // lifecycle

  useEffect(() => {
    const getConnections = async () => {
      try {
        const { data } = await fetchDyads();
        setConnections(data);
      } catch (error) {
        console.log(error);
      }
    }
    const getSuggestions = async () => {
      try {
        const { data } = await suggestConnections();
        setSuggestions(data);
      } catch (error) {
        console.log(error);
      }
    }
    getConnections();
    getSuggestions();
  }, []);
  
  return (
    <>
      <Header title="Connections" subheading="Send and receive requests to make connections. Connected users can train together. Trainers can schedule workouts in their trainees' calendars." />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
        {
          !connections ? (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around' }} >
              <CircularProgress style={{ margin: `${theme.spacing(2)} auto` }} />
            </Grid>
          ) : connections.length === 0 ? (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around' }} >
              <Stack direction="column">
                <Typography variant="body1" align="center">
                  No connections.
                </Typography>
                <Button
                  variant="contained"
                  style={{ margin: `${theme.spacing(2)} auto` }}
                >
                  Make Connections
                </Button>
              </Stack>
            </Grid>
          ) : connections.map((connection) => ((
                <Grid item>
                  <Card>
                    <Typography>
                     {connection.monads.filter((monad) => {
                       return monad.user !== user._id;
                     })?.name}
                    </Typography>
                  </Card>
                </Grid>
              )))
        }
        </Grid>
        <Grid container spacing={4}>
        {
          !suggestions ? (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around' }} >
              <CircularProgress style={{ margin: `${theme.spacing(2)} auto` }} />
            </Grid>
          ) : suggestions.length === 0 ? (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around' }} >
              <Stack direction="column">
                <Typography variant="body1" align="center">
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
            </Grid>
          ) : suggestions.map((suggestion) => ((
                <Grid item>
                  <Card>
                    <Typography>
                      {suggestion?.name}
                    </Typography>
                  </Card>
                </Grid>
              )))
        }
        </Grid>
      </Container>
    </>
  )
}

export default Connections;
