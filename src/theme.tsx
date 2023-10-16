import { red } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/Button" {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/Chip" {
  // eslint-disable-next-line no-unused-vars
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

const palette = createPalette({
  primary: {
    main: "#556cd6",
  },
  secondary: {
    main: "#19857b",
  },
  error: {
    main: red.A400,
  },
});

const theme = createTheme({
  palette: palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const currentColor =
            ownerState.color !== "inherit" && palette[ownerState.color || "primary"].main;
          const bgColor = currentColor || palette.grey[500];
          return {
            fontSize: 15,
            textTransform: "none",
            ...(ownerState.variant === "soft" && {
              color: currentColor || "inherit",
              fontWeight: 500,
              backgroundColor: alpha(bgColor, 0.1),
              "&:hover": {
                backgroundColor: alpha(bgColor, 0.15),
              },
            }),
          };
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.variant === "soft") {
            const currentColor =
              ownerState.color === "default"
                ? palette.grey[500]
                : palette[ownerState.color || "primary"].main;
            return {
              color: currentColor,
              fontWeight: 500,
              backgroundColor: alpha(currentColor, 0.1),
            };
          }
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          textTransform: 'none',
        },
      },
    },

  },
});

export default theme;
