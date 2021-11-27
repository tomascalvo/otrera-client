// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/styles';

// components

import { CircularProgress, Autocomplete, TextField, Typography } from "@mui/material";

// api

import { fetchDyads, inviteUser } from "../../../../api/index";

const InvitationAutofill = () => {

  // hooks

  const theme = useTheme();
  
  // state

  const [connections, setConnections] = useState("loading...");

  // lifecycle

  useEffect(() => {
    const getConnections = async () => {
      try {
        const { data: payload } = await fetchDyads();
        console.log('payload:');
        console.dir(payload);
        setConnections(payload);
      } catch (error) {
        console.log(error);
        setConnections([]);
      }
    };
    getConnections();
  }, []);

  // render

  if ((connections === "loading...")) {
    return <CircularProgress style={{ margin: `${theme.spacing(2)}` }} />;
  }

  if ((connections.length === 0)) {
    return <Typography>No one else is working out. Get a head start.</Typography>;
  }

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={connections.map((dyad) => dyad.monads[0].user.name)}
      getOptionLabel={(option) => option.title}
      // defaultValue={[connections[13]]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="filterSelectedOptions"
          placeholder="Favorites"
        />
      )}
    />
  );
};

export default InvitationAutofill;
