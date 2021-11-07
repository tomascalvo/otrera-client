import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  gridItem: {
    display: "flex",
  },
  textField: {
    "&&": {
      marginRight: theme.spacing(1),
    },
    width: "100%",
  },
  cssLabel: {
    // color: theme.palette.background.default,
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  cssFocused: {
    // color: theme.palette.primary.main,
  },
  notchedOutline: {
    borderColor: `${theme.palette.background.default} !important`,
  },
  iconButton: {
    height: "45px",
    marginTop: "4px",
  },
}));
