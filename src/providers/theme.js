import React, { createContext, useReducer, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import {
  orange,
  blueGrey,
  grey,
  amber,
  purple,
  deepPurple,
  blue,
  lightBlue,
  green,
  lightGreen
} from "@material-ui/core/colors";

export const BLUE_THEME = "blue";
export const ORANGE_THEME = "orange";
export const PURPLE_THEME = "purple";
export const GREY_THEME = "grey";
export const GREEN_THEME = "green";
const colorIndex = 400;

export const userThemes = [
  { name: BLUE_THEME, color: blue[colorIndex] },
  { name: ORANGE_THEME, color: orange[colorIndex] },
  { name: PURPLE_THEME, color: deepPurple[colorIndex] },
  { name: GREY_THEME, color: grey[colorIndex] },
  { name: GREEN_THEME, color: green[colorIndex] }
];

export const CHANGE_THEME = "change-theme";

const defaultTheme = {
  typography: {
    useNextVariants: true
  }
};
const blueTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: blue,
    secondary: lightBlue
  }
});
const orangeTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: orange,
    secondary: amber
  }
});
const purpleTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: deepPurple,
    secondary: purple
  }
});
const greyTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: grey,
    secondary: blueGrey
  }
});

const greenTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: lightGreen,
    secondary: green
  }
});

const getTheme = name => {
  switch (name) {
    case BLUE_THEME:
      return { theme: blueTheme };
    case PURPLE_THEME:
      return { theme: purpleTheme };
    case GREY_THEME:
      return { theme: greyTheme };
    case GREEN_THEME:
      return { theme: greenTheme };
    case ORANGE_THEME:
    default:
      return { theme: orangeTheme };
  }
};

const ThemeContext = createContext();

const getLocal = () => {
  return localStorage.getItem("user-theme");
};

const lv = getLocal();

const initialState = getTheme(lv);

const saveLocal = name => {
  localStorage.setItem("user-theme", name);
};
const themeReducer = (state = initialState, action) => {
  saveLocal(action.payload);
  return getTheme(action.payload);
};

export const useTheme = () => {
  const providerValue = useContext(ThemeContext);
  return providerValue;
};

export default props => {
  const providerValue = useReducer(themeReducer, initialState);
  const [themeState] = providerValue;

  return (
    <ThemeContext.Provider value={providerValue}>
      <MuiThemeProvider theme={themeState.theme}>
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
