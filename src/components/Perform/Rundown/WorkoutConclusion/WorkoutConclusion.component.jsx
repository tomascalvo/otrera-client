import React from "react";

// hooks

import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";

// components

import { Typography, Box, Button } from "@mui/material";

const WorkoutConclusion = ({ performance }) => {
  // hooks
  const history = useHistory();
  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" align="center" sx={{ margin: `${theme.spacing(4)} auto`}} gutterBottom>
        Well done - you've completed {performance.session?.plan?.title}.
      </Typography>
      <Box
        sx={{
          margin: `${theme.spacing(2)} 0`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing(1),
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          // sx={{ maxWidth: "600px" }}
          onClick={() =>
            history.push(`/reviews/review/plan/${performance.session.plan._id}`)
          }
        >
          Give this workout a review.
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          // sx={{ maxWidth: "600px" }}
          onClick={() => history.push("/goals")}
        >
          View my goals and progress.
        </Button>
      </Box>
    </>
  );
};

export default WorkoutConclusion;
