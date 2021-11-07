const darkModeFilter = (theme) => {
  return theme.palette.mode === "dark"
  ? "invert(1) hue-rotate(27deg) contrast(0.805) brightness(1.2)"
  : "hue-rotate(207deg)"
};

export default darkModeFilter;