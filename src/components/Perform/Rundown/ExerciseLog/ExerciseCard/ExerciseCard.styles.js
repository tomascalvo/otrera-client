import { makeStyles } from "@mui/styles";

import darkModeFilter from "../../../../../helper methods/darkModeFilter";

export default makeStyles((theme) => ({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    // backgroundColor: theme.palette.background.default || "#fff",
    filter: darkModeFilter(theme),
    marginBottom: theme.spacing(2),
  },
  image: {
    height: "300px",
    objectFit: "cover",
  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));
