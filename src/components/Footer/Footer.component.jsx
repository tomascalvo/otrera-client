import React from "react";

import { Box, Typography, Link } from "@mui/material";

import useStyles from "./Footer.styles";

import projectTitle from '../../constants/projectTitle';

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer} component="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="localhost:3000/">
          {projectTitle.short}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
