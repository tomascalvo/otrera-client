import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    fileUploadIcon: {
        // maxWidth: '100%',
        '& input': {
            display: 'none',
        },
        margin: '0 auto',
        marginBottom: theme.spacing(1),
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
        display: 'flex',
        alignItems: 'flex-end',
    },
    workoutImage: {
        maxWidth: '100%',
        maxHeight: '360px',
        // margin: '0 auto',
        display: 'block',
        objectFit: 'cover',
        objectPosition: '50% 0%',
    },
}));

export default useStyles;