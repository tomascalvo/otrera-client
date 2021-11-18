import { makeStyles } from '@mui/styles';
import darkModeFilter from '../../../../../../helperMethods/darkModeFilter';

const useStyles = makeStyles((theme) => ({
    avatarImage: {
        filter: darkModeFilter(theme),
    },
    setsReps: {
        // width: '70px',
        width: '48%',
        // m: '0 5px',
    },
}));

export default useStyles;