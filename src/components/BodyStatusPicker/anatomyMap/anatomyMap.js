import { createTheme } from "@mui/material/styles";
import muscleData from "./muscleData";

const anatomyMap = ({
  startingWidth = 325,
  finalWidth = 333,
  bodyStatus = {},
  isFrontView = true,
  isMusclePicker = false,
  selectedTargets = [],
  theme = createTheme({
    palette: {
      mode: "dark",
    },
  }),
}) => {
  console.log(`anatomyMap theme.palette.mode: ${theme.palette.mode}`);
  const scaleCoords = (coords) => {
    const scaledCoords = coords.map((coord, i) => {
      const scaledCoord = coord * (finalWidth / startingWidth);
      const offsetCoord = i % 2 !== 1 ? scaledCoord - 5 : scaledCoord;
      return offsetCoord;
    });
    return scaledCoords;
  };
  function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny];
  }
  const rotateCoords = (coords, angle) => {
    let anchorPoint = [coords[0], coords[1]];
    return coords.map((element, index, array) => {
      let x;
      let y;
      if (index % 2 === 1) {
        x = array[index - 1];
        y = element;
        return Math.floor(
          rotate(anchorPoint[0], anchorPoint[1], x, y, angle)[1]
        );
      } else if (index % 2 === 0) {
        x = element;
        y = array[index + 1];
        return Math.floor(
          rotate(anchorPoint[0], anchorPoint[1], x, y, angle)[0]
        );
      } else {
        return element;
      }
    });
  };
  const reposition = (
    coords,
    isFlip = false,
    xOffset = 0,
    angle = 0,
    yOffset = 0
  ) => {
    let newCoords = coords;
    newCoords = coords.map((coord, i) => {
      let newCoord = coord;
      // select x coordinates
      if (i % 2 === 0) {
        // flip x coordinates
        if (isFlip) {
          newCoord = 333 - coord;
        }
        // offset x coordinates
        return newCoord + xOffset;
        // select y coordinates
      } else {
        return newCoord + yOffset;
      }
    });
    newCoords = rotateCoords(newCoords, angle);
    return newCoords;
  };

  const getColor = (muscle) => {
    const colorSwitch = (condition) => {
      switch (condition) {
        case "impaired":
          return theme.palette.background.paper || "#404040";
        case "injured":
          return theme.palette.secondary.main || "#ce93d8";
        case "sore (acute)":
          return theme.palette.warning.dark || "#f57c00";
        case "sore (mild)":
          return theme.palette.warning.light || "#ffb74d";
        case "fatigued":
          return theme.palette.primary.light || "#648dae";
        case "recovered":
          return theme.palette.info.main || "#2196f3";
        case "selected":
          return theme.palette.info.main || "#2196f3";
        case "unselected":
          return theme.palette.background.paper || "#404040";
        // return theme.palette.divider || "rgba(255, 255, 255, 0.12)";
        default:
          return theme.palette.background.def || "#f00";
        // return "#ff0000";
      }
    };
    if (isMusclePicker) {
      const compareSelectionToArea = (selectionId, areaId) => {
        if (selectionId.split("-")[0] !== areaId.split("-")[0]) {
          return false;
        } else {
          if (!selectionId.split("-")[1]) {
            return true;
          } else if (selectionId.split("-")[1] === areaId.split("-")[1]) {
            return true;
          } else {
            return false;
          }
        }
      };
      const targetIsSelected = selectedTargets.some((selectionId) => {
        return compareSelectionToArea(selectionId, muscle.id);
      });
      const classIsSelected = selectedTargets.includes(muscle.class);
      if (targetIsSelected || classIsSelected) {
        // this is the color of the selected muscles for the exercise picker
        return theme.palette.info.main || "#2196f3";
      } else {
        // this is the color of the unselected muscles for the exercise picker
        return theme.palette.mode === "light" ? "#eee" : "#222";
      }
    } else {
      const muscleId = muscle?.id;
      const color = Object.keys(bodyStatus).includes(muscleId)
        ? colorSwitch(bodyStatus[muscleId])
        : "#404040";
      return color;
    }
  };

  const anteroposteriorSplit = (muscles) => {
    return muscles.reduce((acc, muscle) => {
      if (!Array.isArray(muscle.coords)) {
        acc.push(
          {
            ...muscle,
            coords: muscle.coords.anterior,
            anterior: true,
            posterior: false,
          },
          {
            ...muscle,
            coords: muscle.coords.posterior,
            anterior: false,
            posterior: true,
          }
        );
      } else if (muscle.anterior === true && muscle.posterior === true) {
        acc.push(
          {
            ...muscle,
            coords: muscle.coords,
            anterior: true,
            posterior: false,
          },
          {
            ...muscle,
            coords: reposition(muscle.coords, true),
            anterior: false,
            posterior: true,
          }
        );
      } else {
        acc.push(muscle);
      }
      return acc;
    }, []);
  };

  const medialSplit = (muscles) => {
    return muscles.reduce((acc, muscle) => {
      let xOffset = muscle.xOffset || 0;
      let yOffset = muscle.yOffset || 0;
      let rotation = muscle.rotation || 0;
      if (muscle.paired) {
        let leftCoords;
        let rightCoords;
        if (!Array.isArray(muscle.coords)) {
          leftCoords = {
            anterior: reposition(
              muscle.coords.anterior,
              true,
              6 + xOffset,
              rotation,
              yOffset
            ),
            posterior: muscle.coords.posterior,
          };
          rightCoords = {
            anterior: muscle.coords.anterior,
            posterior: reposition(
              muscle.coords.posterior,
              true,
              6 + xOffset,
              rotation,
              yOffset
            ),
          };
        } else {
          leftCoords = muscle.coords;
          rightCoords = reposition(
            muscle.coords,
            true,
            6 + xOffset,
            rotation,
            yOffset
          );
        }
        acc.push(
          {
            ...muscle,
            id: muscle.id + "-left",
            name: "Left " + muscle.displayName,
            coords: leftCoords,
          },
          {
            ...muscle,
            id: muscle.id + "-right",
            name: "Right " + muscle.displayName,
            coords: rightCoords,
          }
        );
      } else {
        acc.push(muscle);
      }
      return acc;
    }, []);
  };

  const altMap = {
    id: "altAnatomyMap",
    name: "altAnatomyMap",
    areas: anteroposteriorSplit(
      medialSplit(
        Object.values(muscleData).map((muscle) => {
          const classes = !muscle?.classes
            ? ""
            : Array.isArray(muscle?.classes)
            ? muscle?.classes.join("-")
            : muscle?.classes;
          return {
            ...muscle,
            name: muscle.displayName,
            class: classes,
            shape: "poly",
          };
        })
      )
    ).map((muscle) => {
      return {
        ...muscle,
        coords: scaleCoords(muscle.coords),
        preFillColor: getColor(muscle),
      };
    }),
  };

  return {
    ...altMap,
    areas: altMap.areas.reverse().filter((area) => {
      if (isFrontView) {
        return area.anterior;
      } else {
        return area.posterior;
      }
    }),
  };
};

export default anatomyMap;
