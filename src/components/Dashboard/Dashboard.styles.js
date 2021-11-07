import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  mobileContainer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 1, 2),
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%",
  }
}));

export default useStyles;
