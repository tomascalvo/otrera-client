import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    tooltip: {
        position: 'absolute',
        zIndex: 1000,
        padding: "10px",
        borderRadius: "5px",
        color: "#fff",
        background: 'rgba(0, 0, 0, 0.8)',
        pointerEvents: 'none',
    },
}));