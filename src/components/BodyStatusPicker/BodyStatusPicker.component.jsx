// hooks
import React, { useState, useEffect } from "react";
import useStyles from "./BodyStatusPicker.styles";
// import { useWindowSize } from "@react-hook/window-size";
import { useTheme } from "@mui/styles";
// import { useMediaQuery } from "@mui/material";

// components
import ImageMapper from "react-image-mapper";
import anatomyMapper from "./anatomyMap/anatomyMap";
import {
  Menu,
  MenuItem,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
} from "@material-ui/icons";

// assets
import anatomyImage from "../../assets/anatomy-image-7.png";
import anatomyImageInverted from "../../assets/anatomy-image-7-inverse.png";
import {
  // targets as targetStrings,
  // bodyParts as bodyPartStrings,
  conditions,
} from "./queryStrings";
import { targets, bodyParts } from "../../constants/anatomicalTerms";

// api
import {
  fetchCurrentBodyStatusesByUser as fetchStatus,
  createBodyStatusesByUser as updateStatus,
  postRecovery,
} from "../../api/index";

// function useWindowSize() {
//   const isWindowClient = typeof window === "object";

//   const [windowSize, setWindowSize] = useState(
//     isWindowClient ? window.innerWidth : undefined
//   );

//   useEffect(() => {
//     function setSize() {
//       setWindowSize(window.innerWidth);
//     }

//     if (isWindowClient) {
//       // register the window resize listener
//       window.addEventListener("resize", setSize);
//       // un-register the listener
//       return () => window.removeEventListener("resize", setSize);
//     }
//   }, [isWindowClient, setWindowSize]);

//   return windowSize;
// }

const BodyStatusPicker = ({
  setStatus = (bodyStatus) => {
    // console.log("status change");
  },
}) => {
  // auth

  const userId = JSON.parse(localStorage.getItem("profile"))?.user?._id;
  // hooks

  const theme = useTheme();
  const classes = useStyles();
  // const width = useWindowSize()[1];
  // const width = useWindowSize();
  // const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  // const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  // const isMd = useMediaQuery(theme.breakpoints.only("md"));
  // const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  // const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  // state

  // data

  const [bodyStatus, setBodyStatus] = useState({});

  // const [width, setWidth] = useState(window.innerWidth);
  // const [width, setWidth] = useState(useWindowSize()[0]);

  // layout

  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCoords, setAnchorCoords] = useState([0, 0]);
  const [anatomyMap, setAnatomyMap] = useState(anatomyMapper({ theme }));
  const [isFrontView, setIsFrontView] = useState(true);

  // lifecycle

  // layout

  // useEffect(() => {
  //   setWidth(window.innerWidth);
  // }, [window.innerWidth, setWidth]);

  useEffect(() => {
    setAnatomyMap(
      anatomyMapper({
        theme,
        isFrontView,
        bodyStatus,
      })
    );
    return () => {
      setAnatomyMap(anatomyMapper({ theme }));
    };
  }, [bodyStatus, isFrontView, theme]);

  // data
  useEffect(() => {
    async function getStatus() {
      try {
        const { data: bodyStatusesObject } = await fetchStatus(userId);
        setAnatomyMap(
          anatomyMapper({
            bodyStatus: bodyStatusesObject,
            theme,
          })
        );
        setBodyStatus(bodyStatusesObject);
      } catch (error) {
        console.log(error);
      }
    }
    getStatus();
    return () => {
      setAnatomyMap(anatomyMapper({ theme }));
      setBodyStatus({});
    };
  }, [theme, userId]);

  useEffect(() => {
    setStatus(bodyStatus);
  }, [setStatus, bodyStatus]);

  // event handlers

  // layout

  const onHover = (area) => {
    setHoveredArea(area);
  };
  const onMouseOut = () => {
    setHoveredArea(null);
  };

  const handleClickArea = (area, event) => {
    setAnchorCoords(area.scaledCoords.slice(0, 2));
    setAnchorEl(event.currentTarget);
    setSelectedArea(area);
  };

  const handleCloseMenu = () => {
    setSelectedArea(null);
    setAnchorEl(null);
    setAnchorCoords([0, 0]);
  };

  const toggleRotation = () => {
    console.log(
      `Rotating BodyStatusPicker to display ${
        !isFrontView ? "anterior" : "posterior"
      } view.`
    );
    setIsFrontView((previous) => !previous);
    setAnatomyMap(
      anatomyMapper({
        theme,
        startingWidth: 325,
        finalWidth: 333,
        isFrontView: !isFrontView,
        bodyStatus,
      })
    );
  };

  const clearSelection = () => {
    setSelectedArea(null);
    setAnchorEl(null);
    setAnchorCoords([0, 0]);
  };

  // data

  const handleChange = async (event) => {
    event.preventDefault();
    // data
    const statusUpdate = { ...bodyStatus, [selectedArea.id]: event.target.id };
    try {
      const { data: confirmedUpdate } = await updateStatus(
        userId,
        statusUpdate
      );
      console.log("BodyStatus successfully posted", confirmedUpdate);
      setBodyStatus(confirmedUpdate);
      setAnatomyMap(
        anatomyMapper({
          startingWidth: 333,
          finalWidth: 200,
          bodyStatus: confirmedUpdate,
          theme,
          isFrontView,
        })
      );
    } catch (error) {
      console.log(error);
    }
    // layout
    clearSelection();
  };

  const handleRecoverAll = async (e) => {
    e.preventDefault();
    console.log(`handleRecoverAll event handler invoked.`);
    try {
      // const fullRecovery = [...targets, ...bodyParts].map((muscleName) => ({ [muscleName]: "recovered" }
      // )).reduce((target, source) => {
      //   return Object.assign(target, source);
      // });
      // console.log("fullRecovery:")
      // console.dir(fullRecovery);
      const { data: recoveryConfirmation } = await postRecovery(userId);
      console.log("recoveryConfirmation:");
      console.dir(recoveryConfirmation);
      setBodyStatus(recoveryConfirmation);
      setAnatomyMap(
        anatomyMapper({
          startingWidth: 333,
          finalWidth: 200,
          bodyStatus: recoveryConfirmation,
          theme,
          isFrontView,
        })
      );
    } catch (error) {
      console.log(error);
    }
    // layout
    clearSelection();
  };

  // render

  return (
    <div
      id="bodyStatusPicker"
      style={{
        position: "relative",
        // padding: "8px",
        marginTop: theme.spacing(1),
        // height: '100%',
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        position="absolute"
        top="4px"
        right="50%"
        sx={{
          transform: "translateX(80px)",
        }}
        zIndex="tooltip"
      >
        <Tooltip title={isFrontView ? "View Rear" : "View Front"}>
          <IconButton
            aria-label={isFrontView ? "view rear" : "view front"}
            onClick={toggleRotation}
            size="small"
          >
            {isFrontView ? <RotateLeftIcon /> : <RotateRightIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {/* <div */}
      {/* style={{
          // width: '60%',
          margin: "0 auto",
        }} */}
      {/* > */}
      <ImageMapper
        src={
          theme.palette.mode === "dark" ? anatomyImageInverted : anatomyImage
        }
        map={anatomyMap}
        imgWidth={333}
        width={150}
        // width={() => document.getElementById('bodyStatusPicker').parentElement.clientWidth}
        // width={width / 8}
        // width={
        //   isXs ? '150' : isSm? '300' : isXl ? '150' : '150'
        // }
        onMouseEnter={(area) => onHover(area)}
        onMouseLeave={(area) => onMouseOut(area)}
        onClick={(area, _, event) => {
          handleClickArea(area, event);
        }}
        fillColor="#1976d2"
        styles={{
          // display: 'block',
          flexGrow: "1",
          margin: "0 auto",
          alignSelf: "flex-end",
        }}
      />
      <Button sx={{ mt: `${theme.spacing(2)}` }} onClick={handleRecoverAll}>
        Recover All Muscles
      </Button>
      {hoveredArea && (
        <span
          className={classes.tooltip}
          style={{
            top: `${hoveredArea.center[1]}px`,
            left: `${hoveredArea.center[0]}px`,
          }}
        >
          {hoveredArea && hoveredArea.name}
        </span>
      )}
      <Menu
        id="bodyStatus-menu"
        anchorEl={anchorEl}
        autoFocus
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        style={{
          top: anchorCoords[1],
          left: anchorCoords[0],
        }}
      >
        {selectedArea &&
          Object.values(conditions).map((condition, index) => (
            <MenuItem
              key={index}
              id={condition.toLowerCase()}
              onClick={handleChange}
            >
              {condition}
            </MenuItem>
          ))}
      </Menu>
      {/* </div> */}
    </div>
  );
};

export default BodyStatusPicker;
