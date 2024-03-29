import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
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
  },
  flexPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
  }
}));

export default useStyles;
