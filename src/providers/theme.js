import React, { createContext, useReducer, useContext } from "react";
import FakeThemeProvder from "./fake";

const initialState = {
  theme: "default"
};

const ThemeContext = createContext();

const themeReducer = (state = initialState, action) => {
  return { ...state, theme: state.theme + 1 };
};

export const useTheme = () => {
  const providerValue = useContext(ThemeContext);
  return providerValue;
};

export default React.memo(({ children }) => {
  const providerValue = useReducer(themeReducer, initialState);
  console.log("theme render");
  return (
    <ThemeContext.Provider value={providerValue}>
      <FakeThemeProvder>{children}</FakeThemeProvder>
    </ThemeContext.Provider>
  );
});
