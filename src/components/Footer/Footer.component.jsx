import React from "react";

import { Box, Typography, Link } from "@mui/material";

import useStyles from "./Footer.styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer} component="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="localhost:3000/">
          Otrera
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
