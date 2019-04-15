import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import ThemeProvider from "../providers/theme";
import App from "../App";

import menuReducer from "../reducers/menu";
import appReducer from "../reducers/app";
import dataReducer from "../reducers/data";
import popoverReducer from "../reducers/popover";
import editReducer from "../reducers/edit";
import stringsReducer from "../reducers/strings";

const rootReducer = combineReducers({
  menu: menuReducer,
  app: appReducer,
  data: dataReducer,
  popover: popoverReducer,
  edit: editReducer,
  strings: stringsReducer
});

const store = createStore(rootReducer);

export default props => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App>{props.children}</App>
      </ThemeProvider>
    </Provider>
  );
};
