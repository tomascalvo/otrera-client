import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(https://picsum.photos/id/${1037}/900/1350)`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  fileUploadIcon: {
    // maxWidth: '100%',
    "& input": {
      display: "none",
    },
    // margin: "0 auto",
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
    display: "flex",
    alignItems: "flex-end",
  },
  profileImage: {
    maxWidth: "100%",
    maxHeight: "360px",
    margin: '0 auto',
    display: "block",
    objectFit: "cover",
    objectPosition: "50% 0%",
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));
