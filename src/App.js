import React from "react";
import "./App.css";

import Header from "./components/header";
import Content from "./components/content";
import Actions from "./components/actions";
import ActionBar from "./components/actionBar";
import Users from "./components/users";

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
        <Users users={appState.users} />
      </Content>
      <ActionBar message={appState.message} messageKey={appState.messageKey} />
      <EditUser edit={appState.edit} />
    </div>
  );
};

export default App;
