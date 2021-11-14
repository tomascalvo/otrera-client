import { makeStyles } from "@mui/styles";
import darkModeFilter from "../../../helper methods/darkModeFilter";

const useStyles = makeStyles((theme) => ({
  box: {
    bgcolor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 1, 1),
    },
  },
  card: {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // height: 0,
    // padding: '50%',
    objectFit: "cover",
    // objectPosition: "50% 0%",
    filter: darkModeFilter(theme),
  },
}));

export default useStyles;
