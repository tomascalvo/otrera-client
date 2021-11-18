import { makeStyles } from '@mui/styles';
import darkModeFilter from '../../../../helperMethods/darkModeFilter';

export default makeStyles((theme) => ({
  gifUrl: {
    filter: darkModeFilter(theme),
  },
}));