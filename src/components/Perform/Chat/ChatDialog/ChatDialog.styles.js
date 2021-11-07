import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  dialog: {
    overflow: 'hidden',
  },
  backButton: {
    position: "absolute",
    top: "12px",
    left: "12px",
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chatContainer: {
    // width: "100%",
  }
}));