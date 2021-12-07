import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    chatLayout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
        width: 1200,
        marginLeft: "auto",
        marginRight: "auto",
      },
      border: "1px solid red,",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + parseInt(theme.spacing(2)) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
      border: "1px solid cyan,",
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  }));
