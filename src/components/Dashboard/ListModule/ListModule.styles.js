import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    height: '100%',
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonDiv: {
    margin: "0",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
