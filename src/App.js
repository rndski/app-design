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
import EditUser from "./dialogs/edit";
import { CssBaseline } from "@material-ui/core";

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);

  const theme = createMuiTheme({
    palette: {
      primary: orange
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
      <CssBaseline />
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
          <EditUser edit={appState.edit} />
        </appContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
