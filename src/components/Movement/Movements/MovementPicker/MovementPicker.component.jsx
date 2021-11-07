// hooks

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import useStyles from "./MovementPicker.styles";

// components

import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Box,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import MusclePicker from "../../../BodyStatusPicker/MusclePicker.component";

// api

import { searchMovements } from "../../../../api/index";

const MovementPicker = ({
  movementOptions,
  setMovements,
  autocomplete = false,
  selectedMovement,
  setSelectedMovement,
}) => {
  // hooks

  const theme = useTheme();
  const classes = useStyles();

  // state

  const equipmentNames = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller",
  ];

  const [query, setQuery] = useState("");
  const [muscles, setMuscles] = useState([]);
  const [equipment, setEquipment] = useState("all");

  // lifecycle

  useEffect(() => {
    const getMovements = async () => {
      console.log("Movements.component useEffect getMovements() called");
      handleSearch();
    };
    getMovements();
  }, [query, muscles, equipment]);

  // event handlers

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const addMuscle = (muscleName) => {
    console.log("addMuscle invoked. argument: ", muscleName);
    setMuscles([muscleName]);
  };

  const removeMuscle = (muscleName) => {
    setMuscles(muscles.filter((muscle) => muscle !== muscleName));
  };

  const handleSearch = async (e) => {
    console.log("Movements.component handleSearch called.");
    // if (!e || e?.keyCode === 13) {
    const searchParams = {
      query: query !== "" ? query.toLowerCase().trim() : undefined,
      target: muscles.length > 0 ? muscles : undefined,
      equipment: equipment !== "all" ? equipment : undefined,
    };

    console.log("Movements.component searchParams:");
    console.dir(searchParams);

    const { data: payload } = await searchMovements(searchParams);

    console.log("searchMovements payload:");
    console.dir(payload);

    setMovements(payload);
    // }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <FormControl
          fullWidth
          style={{
            margin: `${theme.spacing(1)} auto`,
            maxWidth: 960,
          }}
        >
          <InputLabel id="equipmentSelect-label">Equipment</InputLabel>
          <Select
            id="equipmentSelect"
            labelId="equipmentSelect-label"
            value={equipment}
            label="Equipment"
            onChange={(e) => setEquipment(e.target.value)}
          >
            <MenuItem value={"all"}>all</MenuItem>
            {equipmentNames.map((el, i) => (
              <MenuItem value={el} key={i}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {autocomplete ? (
          <>
            <Autocomplete
              disablePortal
              options={movementOptions}
              autoHighlight
              getOptionLabel={(option) => option.name}
              value={selectedMovement?.id}
              onChange={setSelectedMovement}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="60"
                    src={option?.image || option?.gifUrl}
                    alt={option.name}
                    className={classes.optionImage}
                  />
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Movements"
                  value={query}
                  onChange={handleQuery}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
              style={{
                margin: `${theme.spacing(1)} auto`,
                maxWidth: 960,
              }}
            />
            {(selectedMovement?.gifUrl || selectedMovement?.image) && (
              <img
                src={selectedMovement.gifUrl || selectedMovement?.image}
                alt="Selected Movement"
                className={classes.selectionImage}
              />
            )}
          </>
        ) : (
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type="search"
            onChange={handleQuery}
            onKeyDown={handleSearch}
            fullWidth
            style={{
              margin: `${theme.spacing(1)} auto`,
              maxWidth: 960,
            }}
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <MusclePicker
          muscles={muscles}
          addMuscle={addMuscle}
          removeMuscle={removeMuscle}
          handleSearch={handleSearch}
        />
      </Grid>
    </Grid>
  );
};

export default MovementPicker;
