import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Typography,
} from "@mui/material";

import { LockOutlined as LockIcon } from "@mui/icons-material";

import useStyles from "./Signup.styles";

import Footer from "../Footer/Footer.component";

const Signup = () => {
  const classes = useStyles();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    allowExtraEmails: false,
  });
  const handleChange = (e) => {
    setSignupData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First name"
                autoFocus
                value={signupData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={signupData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoComplete="email"
                label="Email Address"
                name="email"
                required
                variant="outlined"
                id="lastName"
                value={signupData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signupData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="allowExtraEmails"
                    value={signupData.allowExtraEmails}
                    color="primary"
                    onChange={(e) => {
                      setSignupData((previous) => ({
                        ...previous,
                        [e.target.name]: e.target.checked,
                      }));
                    }}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              console.dir(signupData);
            }}
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth" variant="body2">
                Already have an account? Sign in.
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Footer />
          </Box>
        </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;
