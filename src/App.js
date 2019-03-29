import React, { useReducer } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

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
      primary: orange
    },
    status: {
      danger: "orange"
    },
    typography: {
      useNextVariants: true
    }
  });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <appContext.Provider value={appDispatch}>
          <Header busy={appState.busy}>
            <Busy count={appState.users.length} />
          </Header>
          <Content>
            <Users users={appState.users} />
          </Content>
          <ActionBar message={appState.message} />
        </appContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
