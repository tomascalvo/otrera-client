import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(3),
  },
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
  borderLeft: {
    [theme.breakpoints.up("md")] : {
      borderLeft: '1px solid',
      borderColor: theme.palette.divider,
    }
  },
  // borderTop: {
  //   [theme.breakpoints.down("md")] : {
  //     borderTop: '1px solid',
  //     borderColor: theme.palette.text.secondary,
  //     paddingTop: theme.spacing(2),
  //   }
  // }
}));