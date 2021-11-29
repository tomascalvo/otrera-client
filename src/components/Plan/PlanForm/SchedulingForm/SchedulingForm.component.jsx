import moment from 'moment';

// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/styles';
import useStyles from "./SchedulingForm.styles";

// components

import { Typography, Grid, InputBase, List, TextField } from "@mui/material";
import AdapterMoment from '@mui/lab/AdapterMoment'
import {
  LocalizationProvider,
  DateTimePicker
} from '@mui/lab';
import { Search as SearchIcon } from "@material-ui/icons";

import ParticipantListItem from "./ParticipantListItem/ParticipantListItem.component";

// api

import { fetchUsers } from "../../../../api/index";

const SchedulingForm = ({
  planData = {},
  sessionData = { invitees: [] },
  setSessionData,
}) => {

  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);

  // state

  const [users, setUsers] = useState("loading");
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // lifecycle

  useEffect(() => {
    // get a list of users on mount
    async function fetchData() {
      const { data: usersFromDb } = await fetchUsers();
      console.log('usersFromDb: ', usersFromDb);
      setUsers(usersFromDb);
      setFilteredUsers(usersFromDb.slice(0, 9));
    }
    fetchData();
  }, []);

  useEffect(() => {
    // filter users
    if (users !== 'loading') {
      let usersToShow = users?.filter((user) => {
        const includesQuery = user.name
          .toLowerCase()
          .includes(query.toLowerCase().trim());
        let notAlreadyInvited = true;
        if (sessionData?.invitees) {
          notAlreadyInvited = !sessionData?.invitees.some((invitee) => {
            return user._id === invitee._id;
          });
        }
        return includesQuery && notAlreadyInvited;
      });
      if (query === "") {
        usersToShow = usersToShow.slice(0, 8);
      }
      setFilteredUsers(usersToShow);
    }
  }, [users, query, sessionData]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ m: `${theme.spacing(2)} 0` }} className={classes.heading}>Search Users</Typography>
          <div className={classes.search}>
            <InputBase
              startAdornment={
                <SearchIcon />
              }
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              label="Guests"
              fullWidth
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Search Results</Typography>
          <List>
            {filteredUsers.map((user, i) => (
              <ParticipantListItem
                key={i}
                user={user}
                sessionData={sessionData}
                setSessionData={setSessionData}
              />
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Workout Participants</Typography>
          <List>
            {sessionData?.leader?.name && (
              <ParticipantListItem
                user={sessionData?.leader}
                sessionData={sessionData}
                setSessionData={setSessionData}
              />
            )}
            {sessionData?.invitees &&
              sessionData?.invitees
                .filter(
                  (invitedUser) => invitedUser._id !== sessionData?.leader?._id
                )
                .map((user, i) => (
                  <ParticipantListItem
                    key={i}
                    user={user}
                    sessionData={sessionData}
                    setSessionData={setSessionData}
                  />
                ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ marginBottom : theme.spacing(2)}}>Start Date/Time</Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {/* <Grid container spacing={2}>
              <Grid item xs={8}> */}
                <DateTimePicker
                  label="Start Date/Time"
                  value={sessionData?.startTime || moment().add(1, 'days').startOf('day').hours(5)}
                  onChange={(date) =>
                    setSessionData((previous) => ({
                      ...previous,
                      startTime: date,
                    }))
                  }
                  renderInput={(params) => <TextField {...params}/>}
                  // disableToolbar
                  // variant="inline"
                  // format="MM/dd/yyyy"
                  // margin="normal"
                  // id="date-picker-inline"
                  // name="date-picker-inline"
                  // KeyboardButtonProps={{
                  //   "aria-label": "change date",
                  // }}
                  fullWidth
                />
              {/* </Grid>
              <Grid item xs={4}> */}
                <TextField
                  id="estimatedDuration"
                  label="Est. Duration (Minutes)"
                  value={sessionData?.estimatedDuration || 45}
                  className={classes.estimatedDuration}
                  type="number"
                  inputProps={{
                    min: 5,
                    maxLength: 3,
                    step: "5",
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setSessionData((previous) => ({
                      ...previous,
                      estimatedDuration: parseInt(e.target.value),
                    }));
                  }}
                ></TextField>
              {/* </Grid> */}
            {/* </Grid> */}
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default SchedulingForm;
