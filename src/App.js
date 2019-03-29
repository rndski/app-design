import React, { useReducer } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import Header from "./components/header";
import Content from "./components/content";
import Busy from "./components/busy";
import ActionBar from "./components/actionBar";
import Users from "./components/users";

import appReducer, { appInitialState } from "./reducers/appReducer";
import appContext from "./context/app";

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);

  const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    status: {
      danger: "red"
    },
    typography: {
      useNextVariants: true
    }
  });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <appContext.Provider value={appDispatch}>
          <Header busy={appState.busy} count={appState.users.length}>
            <Busy />
          </Header>
          <Content show={true}>
            <Users users={appState.users} />
          </Content>
          <ActionBar
            message={appState.message}
            messageKey={appState.messageKey}
          />
        </appContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
