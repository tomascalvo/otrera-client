import { makeStyles } from "@mui/styles";
import darkModeFilter from "../../../helperMethods/darkModeFilter";

const useStyles = makeStyles((theme) => ({
  box: {
    bgcolor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 1, 1),
    },
    maxWidth: '400px',
    margin: '0 auto',
  },
}));

export default useStyles;
