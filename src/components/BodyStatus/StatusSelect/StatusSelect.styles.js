import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    select: {
        color: ({condition}) => {
            switch(condition) {
                case 'impaired': 
                return '#404040';
                case 'injured': 
                return 'red';
                case 'sore (acute)': 
                return 'orange';
                case 'sore (mild)': 
                return 'goldenrod';
                case 'fatigued': 
                return 'yellowgreen';
                case 'recovered': 
                    return 'green';
                default:
                    break;
            }
        }
    },
    recovered: {
        color: theme.palette.primary.main,
    },
    impaired: {
        color: theme.palette.action.disabled,
    },
    injured: {
        color: theme.palette.error.dark,
    },
    soreAcute: {
        color: theme.palette.warning.dark,
    },
    soreMild: {
        color: theme.palette.warning.light,
    },
    fatigued: {
        color: theme.palette.text.primary,
    },
}));