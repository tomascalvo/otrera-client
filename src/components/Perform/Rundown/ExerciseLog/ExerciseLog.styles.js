import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    "&&": { marginTop: theme.spacing(3), marginLeft: theme.spacing(1) },
  },
}));
