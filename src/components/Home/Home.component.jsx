import React from "react";

// hooks

import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
// import useStyles from './Home.styles';

// components

import { Container, Typography } from "@mui/material";

// assets

import qrCode from "../../assets/qr-code-2.png";

const Home = () => {
  // hooks

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  // const classes = useStyles();

  console.log(`window:`);
  console.dir(window);

  // render

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "400px",
          backgroundImage: `url(https://picsum.photos/id/${1015}/${800}/${450})`,
          backgroundSize: "cover",
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {isSmUp && (
          <img
            src={qrCode}
            alt="app download QR code"
            style={{
              position: "relative",
              width: "200px",
              margin: "auto",
              display: "block",
            }}
          />
        )}
        <Container
          style={{
            width: "100%",
            padding: theme.spacing(3),
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Scan the code to download the app.
          </Typography>
        </Container>
      </div>
      <Container
        align="center"
        maxWidth="sm"
        style={{
          width: "100%",
          paddingTop: theme.spacing(4),
        }}
      >
        <Typography variant="h4" gutterBottom>
          Let's Train Together
        </Typography>
        <Typography variant="body" paragraph color="text.secondary">
          The Otrera Fitness App has everything you need to start training, keep
          training, and enjoy training more. Never laced up? We got you. Need a
          coach to keep pace or a friend to keep you company? We’re there. Want
          us to track your stats so you can track the scenery? No problem. Even
          if you don’t feel like training today, Otrera has wellness tips to
          help you get ready for tomorrow. Start whenever and wherever you want
          — we’ll be right there with you.
        </Typography>
      </Container>
    </>
  );
};

export default Home;
