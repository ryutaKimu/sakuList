import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8e0e7", // 桜色
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
  },
});

export default theme;
