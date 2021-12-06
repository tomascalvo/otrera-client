import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    alert: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },
    button: {
        whiteSpace: 'pre-line',
        minHeight: '5rem',
    },
    newSession: {
        whiteSpace: 'noWrap',
        width: '300px',
        // padding: theme.spacing(1),
    }
}));