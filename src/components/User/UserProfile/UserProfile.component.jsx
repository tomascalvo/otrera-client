import moment from "moment";
import React, { useState, useEffect } from "react";

// api
import {
  fetchUser,
  fetchFavoriteMovements,
  fetchPlansByCreator,
} from "../../../api/index";

// hooks
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/styles";

// components

import {
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const UserProfile = () => {
  // hooks
  const { userId: profileId } = useParams();
  const theme = useTheme();

  // state
  const [profile, setProfile] = useState("loading...");
  const [favoriteMovements, setFavoriteMovements] = useState("loading...");
  const [plansCreated, setPlansCreated] = useState("loading...");

  // lifecycle

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await fetchUser(profileId);
        setProfile(data);
      } catch (error) {
        console.log(error);
        setProfile([]);
      }
    };
    const getFavoriteMovements = async () => {
      try {
        const { data } = await fetchFavoriteMovements(profileId);
        setFavoriteMovements(data);
      } catch (error) {
        console.log(error);
        setFavoriteMovements([]);
      }
    };
    const getPlansByCreator = async () => {
      try {
        const { data } = await fetchPlansByCreator(profileId);
        setPlansCreated(data);
      } catch (error) {
        console.log(error);
        setPlansCreated([]);
      }
    };
    fetchProfile();
    getFavoriteMovements();
    getPlansByCreator();
  }, [profileId]);

  // render

  if (profile === "loading...") {
    return (
      <Box sx={{ margin: '0 auto' }}>
        <CircularProgress sx={{ m: `${theme.spacing(4)} auto` }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 2),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(2, 1, 1),
        },
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={profile?.image}
          alt={profile?.name}
        />
        <CardContent>
          <Typography color="text.primary">{profile?.name}</Typography>
          <Typography color="text.secondary">
            Joined: {moment(profile.createdAt).format("MM/DD/YY")}
          </Typography>
          <Typography color="text.secondary">
            Plans: {plansCreated.length}
          </Typography>
          <Typography color="text.secondary">
            Favorite Movements: {favoriteMovements.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
