import React from "react";

// components

import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({ 
  name, 
  label, 
  type, 
  handleChange, 
  handleShowPassword,
  autoFocus, 
  autoComplete,
  value, 
  half,
  isSignup
}) => {

  // render

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        id={name}
        label={label}
        autoFocus={autoFocus}
        value={value}
        type={type}
        autoComplete={autoComplete}
        onChange={handleChange}
        required
        variant="outlined"
        fullWidth
        InputProps={
          (name === "password" && !isSignup) ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          } : null
        }
      />
    </Grid>
  );
};

export default Input;
