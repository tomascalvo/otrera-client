// hooks
import React, { useState, useEffect } from "react";
import useStyles from "./BodyStatusPicker.styles";
import { useTheme } from "@mui/styles";
// import { useWindowSize } from "@react-hook/window-size";

// components
import ImageMapper from "react-image-mapper";
import anatomyMapper from "./anatomyMap/anatomyMap";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
} from "@material-ui/icons";

// assets
import anatomyImage from "../../assets/anatomy-image-7.png";
import anatomyImageInverted from "../../assets/anatomy-image-7-inverse.png";
// import {targets as targetStrings, bodyParts as bodyPartStrings, conditions } from "./queryStrings";

// api
import {} from "../../api/index";

const MusclePicker = ({ muscles, addMuscle, removeMuscle }) => {
  // hooks
  const classes = useStyles();
  const theme = useTheme();
  // console.log(`MusclePicker theme.palette.mode: ${theme.palette.mode}`);

  // const { innerHeight, innerWidth } = useWindowSize();

  // state

  // layout
  // const [width, setWidth] = useState(0);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [anatomyMap, setAnatomyMap] = useState(
    anatomyMapper({ theme, isMusclePicker: true })
  );
  const [isFrontView, setIsFrontView] = useState(true);

  // data
  // const [bodyStatus, setBodyStatus] = useState({});

  // lifecycle

  // layout
  // useEffect(() => {
  //   setWidth(innerWidth);
  // }, [innerHeight, innerWidth]);

  useEffect(() => {
    setAnatomyMap(
      anatomyMapper({
        theme,
        isMusclePicker: true,
        isFrontView,
        selectedTargets: muscles,
      })
    );
    // return () => {
    //   setAnatomyMap(anatomyMapper({ theme, isMusclePicker: true, isFrontView, }));
    // }
  }, [muscles, isFrontView, theme]);

  // event handlers

  // layout

  const onHover = (area) => {
    setHoveredArea(area);
  };
  const onMouseOut = () => {
    setHoveredArea(null);
  };

  const handleClickArea = (area) => {
    console.log(`${area.name} clicked: `, area);
    // const muscleClass = area.class;
    const muscleId = area.id.split('-')[0];
    // console.log(muscleClass, "clicked");
    console.log(muscleId, "clicked");
    // if (muscles.includes(muscleClass)) {
    //   removeMuscle(muscleClass);
    // } else {
    //   addMuscle(muscleClass);
    // }
    if (muscles.includes(muscleId)) {
      removeMuscle(muscleId);
    } else {
      addMuscle(muscleId);
    }
  };

  const toggleRotation = () => {
    setIsFrontView((previous) => !previous);
    setAnatomyMap(
      anatomyMapper({
        theme,
        isMusclePicker: true,
        isFrontView: !isFrontView,
        selectedTargets: muscles,
      })
    );
  };

  return (
    <div
      style={{
        position: "relative",
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-around",
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
            // classNames={classes.rotationButton}
            size="medium"
          >
            {isFrontView ? <RotateLeftIcon /> : <RotateRightIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <ImageMapper
        src={
          theme.palette.mode === "dark" ? anatomyImageInverted : anatomyImage
        }
        map={anatomyMap}
        imgWidth={333}
        width={150}
        onMouseEnter={(area) => onHover(area)}
        onMouseLeave={(area) => onMouseOut(area)}
        onClick={(area) => {
          handleClickArea(area);
        }}
        fillColor={theme.palette.info.light || "#1976d2"}
        // fillColor= {theme.palette.action.hover || "#1976d2"}
        // strokeColor= {"rgba(128, 128, 128, 0.5)"}
        strokeColor={theme.palette.mode === "dark" ? "#fff" : "#000"}
        style={{ margin: "0 auto" }}
      />
      {hoveredArea && (
        <span
          className={classes.tooltip}
          style={{
            top: `${hoveredArea.center[1]}px`,
            left: `${hoveredArea.center[0]}px`,
          }}
        >
          {hoveredArea && hoveredArea.displayName}
        </span>
      )}
    </div>
  );
};

export default MusclePicker;
