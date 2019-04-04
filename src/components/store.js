import React, { useReducer, createContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";

import themeReducer, { themeInitialState } from "../reducers/themeReducer";
import appReducer, { appInitialState } from "../reducers/appReducer";
import App from "../App";

export const themeContext = createContext();
export const appContext = createContext();

export default props => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );

  return (
    <themeContext.Provider value={themeDispatch}>
      <MuiThemeProvider theme={themeState.theme}>
        <appContext.Provider value={appDispatch}>
          <App appState={appState}>{props.children}</App>
        </appContext.Provider>
      </MuiThemeProvider>
    </themeContext.Provider>
  );
};
