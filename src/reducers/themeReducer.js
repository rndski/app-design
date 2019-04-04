import { createMuiTheme } from "@material-ui/core/styles";
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

export const greenTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: lightGreen,
    secondary: green
  }
});

const getLocal = () => {
  return localStorage.getItem("user-theme");
};

const saveLocal = (name, theme) => {
  localStorage.setItem("user-theme", name);
  return theme;
};

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

const lv = getLocal();
export const themeInitialState = getTheme(lv);

export const themeReducer = (state, action) => {
  //console.log(`Reduce[${action.type}]`);
  saveLocal(action.type);
  return getTheme(action.type);
};

export default themeReducer;
