import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
  messageArea: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    flexGrow: '1',
    maxHeight: '55vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  messages: {
    // padding: "5% 0",
    overflow: "auto",
    flex: "auto",
  },
  message: {
    width: '100%',
  },
  composition: {
    // marginTop: "200px", 
    padding: theme.spacing(2), 
    flexGrow: '0' 
  },
  messageInput: {
    width: "90%",
  }
}));