import { makeStyles } from "@mui/styles";
import darkModeFilter from "../../../../helperMethods/darkModeFilter";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    overflow: "visible",
  },
  cardMedia: {
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 0%",
    filter: darkModeFilter(theme),
  },
  collapse: {
    // minHeight: "100%",
    // height: '300px',
    // overflow: 'scroll',
    // border: "1px solid magenta",
    paddingTop: '0px',
  },
  cardContent: {
    // border: "1px solid red",
    // minHeight: "180px",
    // height: '100%',
    paddingTop: "0px",
    // overflow: 'auto',
  },
}));

export default useStyles;
