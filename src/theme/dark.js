export const darkTheme = {
  colors: {
    grey000: "#FFFFFE",
    grey100: "#F2F3F6",
    grey200: "#9C9DA0",
    grey300: "#97999E",
    grey400: "#43414D",
    grey500: "#3F4C5C",
    grey600: "#3f4c5c",
    grey700: "#1D2733",
    grey800: "rgba(63, 76, 92, 0.5)",
    grey900: "#1A1C1E",
    orange100: "#FF8E3C",
    orange200: "#D67935",
    orange300: "rgba(214, 121, 53, 0.5)",
    red100: "#EB5760",
    gradient1: "linear-gradient(180deg, #2A2A2A 0%, #0D0D0D 100%)",
    gradient2:
      "linear-gradient(0deg, rgba(63, 76, 92, 0.7), rgba(63, 76, 92, 0.7)), #0D0D0D"
  },

  fontSizes: [14, 16, 18, 32],
  fonts: {
    body: "Roboto,  Helvetica, sans-serif",
    heading: "inherit"
  },
  buttons: {
    primary: {
      height: "48px",
      width: "232px",
      backgroundColor: "#D67935",
      letterSpacing: "0.3px",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFE",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#DB7124"
      },
      "&:focus": {
        backgroundColor: "#DB7124"
      }
    },
    secondary: {
      height: "48px",
      width: "92px",
      borderRadius: "4px",
      letterSpacing: "0.3px",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFE",
      border: "none",
      cursor: "pointer"
    }
  },
  shadows: {
    large: "0px 0px 25px rgba(13, 13, 13, 0.05)"
  },
  breakpoints: ["320px", "1200px"]
};
