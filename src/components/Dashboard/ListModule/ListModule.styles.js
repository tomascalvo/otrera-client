import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    height: `calc(100% - ${theme.spacing(4)})`,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonDiv: {
    margin: "0",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default useStyles;
