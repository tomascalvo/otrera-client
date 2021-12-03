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
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    border: '1px solid red',
    flex: '0',
    margin: '100px',
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