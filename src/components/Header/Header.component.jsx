import React from "react";

// hooks

import { useTheme } from '@mui/styles';
import useStyles from './Header.styles';
import { useMediaQuery } from "@mui/material";

// components

import { Box, Container, Typography, Stack, Button } from "@mui/material";

const Header = ({
  title = "Page Title",
  subheading = "Create, read, update, and delete data here.",
  mainAction,
  secondaryAction,
  // mainAction = {
  //   title: "Main call to action",
  //   onClick: () => console.log(`${this.title} onClick invoked`),
  // },
  // secondaryAction = {
  //   title: "Secondary action",
  //   onClick: () => console.log(`${this.title} onClick invoked`),
  // },
}) => {

  // hooks

  const theme = useTheme();
  const classes = useStyles(theme);
  console.log(classes)
  
  // render

  return (
    <Box
    className={classes.box}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant={useMediaQuery(theme.breakpoints.up("sm")) ? "h2" : "h4"}
          align="center"
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant={useMediaQuery(theme.breakpoints.up("sm")) ? "h5" : "h6"}
          align="center"
          color="text.secondary"
          paragraph
        >
          {subheading}
        </Typography>
        {
          (mainAction || secondaryAction) && (
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {mainAction && (
                <Button variant="contained" onClick={mainAction?.onClick}>
                  {mainAction.title}
                </Button>
              )}
              {secondaryAction && (
                <Button variant="outlined" onClick={secondaryAction?.onClick}>
                  {secondaryAction.title}
                </Button>
              )}
            </Stack>
          )
        }
      </Container>
    </Box>
  );
};

export default Header;
