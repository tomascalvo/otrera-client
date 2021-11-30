import FileBase from "react-file-base64";

// hooks

import React, { useState } from "react";
import useStyles from "./Auth.styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// constants

// import { AUTH } from '../../constants/actionTypes';

// actions

import { signin, signup, googleSignin } from "../../actions/auth";

// components

import {
  Grid,
  Avatar,
  Button,
  // FormControlLabel,
  // Checkbox,
  Link,
  Paper,
  Box,
  Typography,
} from "@mui/material";

import { GoogleLogin } from "react-google-login";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import Icon from "./icon";
import Input from "./Input/Input.component";
import Footer from "../Footer/Footer.component";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  password: "",
  passwordConfirmation: "",
  allowExtraEmails: false,
};

const Auth = () => {
  // hooks

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('history: ', history);

  // state

  const hasAuthorized = localStorage.getItem('hasAuthorized');
  
  const [isSignup, setIsSignup] = useState(!hasAuthorized);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  // event handlers

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((previous) => !previous);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("auth submission: ", formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const googleSuccess = async (res) => {
    console.log("google success res: ", res);
    const profile = res?.profileObj;
    const token = res?.tokenId;
    dispatch(googleSignin({ profile, token }, history));
  };

  const googleFailure = (error) => {
    console.log("Google sign in was unsuccessful: ", error);
  };

  // render

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First name"
                    type=""
                    autoFocus={isSignup}
                    autoComplete="fname"
                    handleChange={handleChange}
                    value={formData.firstName}
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last name"
                    type="email"
                    autoComplete="lname"
                    handleChange={handleChange}
                    value={formData.lastName}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email address"
                type=""
                autoFocus={!isSignup}
                autoComplete="email"
                handleChange={handleChange}
                value={formData.email}
              />
              {isSignup && (
                <Grid item xs={12}>
                  {formData?.image && (
                    <img
                      src={formData?.image}
                      alt="Profile"
                      className={classes.profileImage}
                    />
                  )}
                  <Button
                    component="label"
                    variant="contained"
                    fullWidth
                    className={classes.fileUploadIcon}
                  >
                    <FileBase
                      className={classes.fileInput}
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setFormData((previous) => {
                          return { ...previous, image: base64 };
                        })
                      }
                    />
                    {formData?.image ? "Change Image" : "Upload Image"}
                  </Button>
                </Grid>
              )}
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                value={formData.password}
                isSignup={isSignup}
              />
              {isSignup && (
                <Input
                  name="passwordConfirmation"
                  label="Confirm password"
                  type={showPassword ? "text" : "password"}
                  handleChange={handleChange}
                  value={formData.passwordConfirmation}
                />
              )}
              {/* { isSignup && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="allowExtraEmails"
                        value={formData.allowExtraEmails}
                        color="primary"
                        onChange={(e) => {
                          setFormData((previous) => ({
                            ...previous,
                            [e.target.name]: e.target.checked,
                          }));
                        }}
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
              </Grid>
              )} */}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 1 }}
              className={classes.submit}
            >
              {isSignup ? "Sign up" : "Sign in"}
            </Button>
            <GoogleLogin
              clientId="100332997207-anb2tacm6a0kjonokavbqrjnng47fb7a.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  sx={{ mt: 1, mb: 2 }}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google sign in
                </Button>
              )}
            />
            <Grid container justifyContent="flex-end">
              {!isSignup && (
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              )}
              <Grid item>
                <Link
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignup((previous) => !previous);
                  }}
                >
                  {isSignup
                    ? "Already have an account? Sign in."
                    : "Don't have an account? Sign up."}
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

export default Auth;
