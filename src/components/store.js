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
import filterReducer from "../reducers/filter";

const rootReducer = combineReducers({
  menu: menuReducer,
  app: appReducer,
  data: dataReducer,
  popover: popoverReducer,
  edit: editReducer,
  strings: stringsReducer,
  filter: filterReducer
});

const store = createStore(rootReducer);

export default ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App>{children}</App>
      </ThemeProvider>
    </Provider>
  );
};
