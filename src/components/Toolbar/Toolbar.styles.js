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
  brandContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
    display: 'inline-block',
    alignItems: 'center',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(2)}`,
    marginRight: theme.spacing(2)
  },
}));

export default useStyles;
