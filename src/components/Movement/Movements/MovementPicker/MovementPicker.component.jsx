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
  const [targets, setTargets] = useState([]);
  const [equipment, setEquipment] = useState("all");

  // lifecycle

  useEffect(() => {
    const getStartingMovements = async () => {
      try {
        console.log("Movements.component calls searchMovements()");
        handleSearch();
      } catch (error) {
        console.log(error);
      }
    };
    getStartingMovements();
  }, [query, targets, equipment ]);

  // event handlers

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const addMuscle = (muscleName) => {
    console.log("addMuscle invoked. argument: ", muscleName);
    // setTargets((previous) => [...previous, muscleName]);
    setTargets([muscleName]);
  };

  const removeMuscle = (muscleName) => {
    setTargets((previous) => {
      return previous.filter((muscle) => muscle !== muscleName);
    });
  };

  const handleSearch = async (e) => {
    console.log("Movements.component handleSearch called.");
    // if (!e || e?.keyCode === 13) {
    const searchParams = {
      query: query !== "" ? query.toLowerCase().trim() : undefined,
      targets: targets.length > 0 ? targets : undefined,
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
      <Grid item xs={6} md={8}>
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
              clearOnBlur
              options={movementOptions}
              autoHighlight
              getOptionLabel={(option) => option?.title || option?.name}
              value={selectedMovement?.id}
              onChange={(e, value) => {
                // console.log('MovementPicker Autocomplete onChange invoked');
                // console.log('value:');
                // console.dir(value);
                e.preventDefault();
                if (value !== null) {
                  setSelectedMovement(e, value);
                  setQuery("");
                }
              }}
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
                  {option?.title || option?.name}
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
      <Grid item xs={6} md={4}>
        <MusclePicker
          muscles={targets}
          addMuscle={addMuscle}
          removeMuscle={removeMuscle}
          handleSearch={handleSearch}
        />
      </Grid>
    </Grid>
  );
};

export default MovementPicker;
