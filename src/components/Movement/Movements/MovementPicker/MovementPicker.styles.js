import { makeStyles } from "@mui/styles";
import darkModeFilter from "../../../../helperMethods/darkModeFilter";

const useStyles = makeStyles((theme) => ({
  optionImage: {
    borderRadius: '50%',
    filter: darkModeFilter(theme),
  },
  selectionImage: {
    margin: '0 auto',
    maxWidth: "100%",
    maxHeight: "250px",
    // margin: '0 auto',
    display: "block",
    objectFit: "cover",
    objectPosition: "50% 0%",
    filter: darkModeFilter(theme),
  },
}));

export default useStyles;
