import React from "react";
import { CssBaseline } from "@material-ui/core";

import UserPopover from "./components/popover";
import Header from "./components/header";
import Content from "./components/content";
import Actions from "./components/actions";
import ActionBar from "./components/actionBar";
import Users from "./components/users";
import EditUser from "./dialogs/edit";
import UserMenu from "./components/menu";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Header>
        <Actions />
        <UserMenu />
      </Header>
      <Content>
        <Users />
      </Content>
      <ActionBar />
      <EditUser />
      <UserPopover />
    </div>
  );
};

export default App;
