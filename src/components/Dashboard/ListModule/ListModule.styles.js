import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    // height: `calc(100% - ${theme.spacing(4)})`,
    height: '100%',
    // height: 'auto',
    border: '1px solid red',
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonDiv: {
    margin: "0",
    // height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
