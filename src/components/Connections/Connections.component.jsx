// hooks

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import { useHistory } from 'react-router-dom';

// api

import { suggestConnections, fetchUsers, createDyad, fetchDyads } from '../../api/index';

// components

import { Container, Grid, Stack, CircularProgress, Typography, Card, Button } from '@mui/material';

import Header from '../Header/Header.component';

const user = JSON.parse(localStorage.getItem('profile')).user;

const Connections = () => {

  // hooks

  const history = useHistory();
  const theme = useTheme();

  // state

  console.log('user:');
  console.log(user);
  const [connections, setConnections] = useState(undefined);
  const [suggestions, setSuggestions] = useState(undefined);

  // lifecycle

  useEffect(() => {
    const getConnections = async () => {
      try {
        const { data } = await fetchDyads();
        setConnections(data);
      } catch (error) {
        setConnections([]);
        console.log(error);
      }
    }
    const getSuggestions = async () => {
      try {
        const { data } = await suggestConnections();
        // const { data } = await fetchUsers();
        setSuggestions(data);
      } catch (error) {
        setSuggestions([]);
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
          ) : connections.map((connection, i) => ((
                <Grid item key={i}>
                  <Card>
                    <Typography>
                     {connection.monads.filter((monad) => {
                       return monad.user._id !== user._id;
                     })[0].user.name}
                    </Typography>
                  </Card>
                </Grid>
              )))
        }
        </Grid>
        <Typography>
          All users
        </Typography>
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
          ) : suggestions.map((suggestion, i) => ((
                <Grid item key={i}>
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
