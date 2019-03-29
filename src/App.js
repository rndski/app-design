import React, { useReducer } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

import Header from "./components/header";
import Content from "./components/content";
import Busy from "./components/busy";
import ActionBar from "./components/actionBar";
import Users from "./components/users";

import uiReducer, { uiInitialState } from "./reducers/uiReducer";
import dataReducer, { dInitialState } from "./reducers/dataReducer";

import uiContext from "./context/ui";
import dataContext from "./context/data";

const App = () => {
  const [ui, uiDispatch] = useReducer(uiReducer, uiInitialState);
  const [data, dataDispatch] = useReducer(dataReducer, dInitialState);

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
        <dataContext.Provider value={dataDispatch}>
          <uiContext.Provider value={uiDispatch}>
            <Header busy={ui.busy}>
              <Busy busy={ui.busy} />
            </Header>
            <Content>
              <Users users={data.users} />
            </Content>

            <ActionBar message={ui.action} />
          </uiContext.Provider>
        </dataContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
