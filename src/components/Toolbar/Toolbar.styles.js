import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    webkitFlexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
    display: 'inline-block',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    // width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(2)}`,
    marginRight: theme.spacing(2)
  },
}));

export default useStyles;
