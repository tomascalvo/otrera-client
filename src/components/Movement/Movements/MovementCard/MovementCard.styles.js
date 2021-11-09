import { makeStyles } from "@mui/styles";
import darkModeFilter from "../../../../helper methods/darkModeFilter";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 0,
        padding: '50%',
        objectFit: "cover",
        objectPosition: "50% 0%",
        filter: darkModeFilter(theme),
    },
    cardContent: {
        flexGrow: 1
    },
}));

export default useStyles;