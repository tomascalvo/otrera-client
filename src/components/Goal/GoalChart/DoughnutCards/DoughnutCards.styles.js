import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  achieved: {
    borderBottom: `10px solid ${theme.palette.success.main}`,
  },
  urgent: {
    borderBottom: `10px solid ${theme.palette.warning.main}`,
  },
  critical: {
    borderBottom: `10px solid ${theme.palette.error.main}`,
  },
  failed: {
    borderBottom: "10px solid rgba(0, 0, 0, 0.5)",
  },
}));

export default useStyles;