import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    webkitFlexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  brandContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: theme.spacing(0),
    textDecoration: 'none',
    color: 'red',
  },
  logo: {
    marginLeft: theme.spacing(0),
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(2)}`,
    marginRight: theme.spacing(2)
  },
}));

export default useStyles;
