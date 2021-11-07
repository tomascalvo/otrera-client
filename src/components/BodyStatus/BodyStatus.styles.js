import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        // MUI CSS media query below limits the width of the main tag on larger screens. 
        // https://material-ui.com/customization/breakpoints/
        // Consider increasing the width attribute to allow more content, <Grid> items to show side-by-side
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    regionGroup: {
        display: 'inline',
        justifyContent: 'space-between',
    },

    button: {
        margin: theme.spacing(3, 0, 2),
    }
}));