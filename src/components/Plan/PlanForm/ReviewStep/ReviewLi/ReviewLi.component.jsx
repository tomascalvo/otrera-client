import React from "react";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import ReactStars from "react-rating-stars-component";

const ReviewLi = ({ review }) => {
  return (
    <ListItem dense>
      <ListItemAvatar>
        <Avatar
          src={review.author.image}
          alt={`Avatar of ${review.author.name}`}
        />
      </ListItemAvatar>
      <ListItemText primary={review.author.name} secondary={review.comment} />
      <ListItemSecondaryAction>
        <ReactStars
            count={review.overall}
            edit={false}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ReviewLi;
