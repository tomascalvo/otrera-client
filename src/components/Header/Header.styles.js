import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  box: {
    bgcolor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1, 1),
    },
  },
}));
