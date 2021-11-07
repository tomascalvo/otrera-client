import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  
  return {
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + parseInt(theme.spacing(2)) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + parseInt(theme.spacing(3)) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    container: {
      padding: theme.spacing(3),
    },
    workoutImage: {
      maxWidth: '100%',
      maxHeight: '360px',
      // margin: '0 auto',
      display: 'block',
      objectFit: 'cover',
      objectPosition: '50% 0%',
  },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }
});

export default useStyles;
