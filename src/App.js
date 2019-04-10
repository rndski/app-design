import React from "react";
import "./App.css";
import UserPopover from "./components/popover";

import Header from "./components/header";
import Content from "./components/content";
import Actions from "./components/actions";
import ActionBar from "./components/actionBar";
import Users from "./components/users";
//import ThemeProvider from "./providers/theme";

import EditUser from "./dialogs/edit";
import { CssBaseline } from "@material-ui/core";
import UserMenu from "./components/menu";

const App = ({ appState }) => {
  return (
    <div className="App">
      <CssBaseline />
      <Header busy={appState.busy} count={appState.users.length}>
        <Actions />
        <UserMenu anchor={appState.menu.anchor} open={appState.menu.open} />
      </Header>
      <Content>
        {/* <ThemeProvider /> */}
        <Users users={appState.users} />
      </Content>
      <ActionBar message={appState.message} messageKey={appState.messageKey} />
      <EditUser edit={appState.edit} />
      <UserPopover
        open={appState.popover.open}
        image={appState.popover.image}
        anchor={appState.popover.anchor}
      />
    </div>
  );
};

export default App;
