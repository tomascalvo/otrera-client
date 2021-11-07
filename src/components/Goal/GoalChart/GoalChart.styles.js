import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flexContaner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '400px',
    maxHeight: '40vh',
    flexGrow: '1',
  },
  goalPicker: {
    marginTop: theme.spacing(1),
    marginBotom: theme.spacing(1),
    flex: '0',
  },
  chartContainer: {
    // border: '1px solid red',
    position: 'relative',
    // height: "85%",
    flexGrow: '1',
    flexShrink: '0',
    minHeight: '300px',
  }
}));

export default useStyles;