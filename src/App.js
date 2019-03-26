import React, { useReducer } from "react";
import "./App.css";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/header";
import Content from "./components/content";
import Container from "./components/container";
import Busy from "./components/busy";

import uiReducer, { uiInitialState } from "./reducers/uiReducer";
import uiContext from "./context/ui";
import ShowBusy from "./components/showBusy";

const App = () => {
  const [state, dispatch] = useReducer(uiReducer, uiInitialState);

  return (
    <div className="App">
      <CssBaseline>
        <uiContext.Provider value={dispatch}>
          <Header busy={state.busy} />

          <Container name="Outer">
            <Container name="Inner">
              <ShowBusy busy={state.busy} />
              <Content name="C1">
                <Busy />
                <Container name="Another">
                  <Content name="C2">
                    <Busy />
                  </Content>
                </Container>
              </Content>
            </Container>
          </Container>
        </uiContext.Provider>
      </CssBaseline>
    </div>
  );
};

export default App;
