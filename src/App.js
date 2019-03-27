import React, { useReducer } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import Header from "./components/header";
import Content from "./components/content";
import Container from "./components/container";
import Busy from "./components/busy";
import ShowBusy from "./components/showBusy";

// CCS - deletes, busy etc, cause renders.
import Users from "./components/users";

//no CSS (withstyles) - less renders
//import Users from "./components/user2";

import uiReducer, { uiInitialState } from "./reducers/uiReducer";
import dataReducer, { dInitialState } from "./reducers/dataReducer";

import uiContext from "./context/ui";
import dataContext from "./context/data";

const App = () => {
  const [ui, uiDispatch] = useReducer(uiReducer, uiInitialState);
  const [data, dataDispatch] = useReducer(dataReducer, dInitialState);

  const theme = createMuiTheme({
    palette: {
      primary: blue
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
            <Container main={true}>
              <Content>
                {/* causes unmount {state.busy ? <ShowBusy busy={state.busy} /> : null} */}
                {/* <Busy busy={ui.busy} /> */}
                <Users users={data.users} />
                {/* <Container name="Another">
                    <Busy busy={ui.busy} />
                    <Users users={data.users} />
                  </Container> */}
              </Content>
              {/* <Busy busy={ui.busy} /> */}
              <ShowBusy busy={ui.busy} />
            </Container>
          </uiContext.Provider>
        </dataContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
