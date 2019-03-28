import React, { useEffect } from "react";

import User from "./user";
import Grid from "@material-ui/core/Grid";

const Users = ({ users }) => {
  useEffect(() => {
    console.log("%c%s: useEffect(mounted)", "color:red", "Users");
    return () => {
      console.warn("+++ Users: useEffect(unmounted)");
    };
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      spacing={24}
    >
      {users.map(item => {
        return <User key={item.login.uuid} item={item} />;
      })}
    </Grid>
  );
};

Users.propTypes = {};

export default Users;
