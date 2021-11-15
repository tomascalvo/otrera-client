import { makeStyles } from '@mui/styles';
import darkModeFilter from '../../../../helper methods/darkModeFilter';

export default makeStyles((theme) => ({
  gifUrl: {
    filter: darkModeFilter(theme),
  },
}));