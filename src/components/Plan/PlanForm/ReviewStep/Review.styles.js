import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    imageContainer: {
        maxWidth: '100%',
        margin: '0 auto',
    },
    fileUploadIcon: {
        width: '100%',
        '& input': {
            display: 'none',
        }
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
        display: 'flex',
        alignItems: 'flex-end',
    },
    workoutImage: {
        width: '100%',
        maxHeight: '200px',
        margin: '0 auto',
        display: 'block',
        objectFit: 'cover',
        objectPosition: '50% 0%',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    button: {
        marginTop: theme.spacing(3),
        width: '45%'
    },
    starsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

export default useStyles;