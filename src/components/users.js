import React from "react";
import PropTypes from "prop-types";

import User from "./user";
import Grid from "@material-ui/core/Grid";

const Users = ({ users }) => {
  //console.log("Users Render");

  return users.length > 0 ? (
    <div style={{ padding: 15 }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        spacing={24}
      >
        {users.map(item => {
          return <User key={item.login.uuid} item={item} />;
        })}
      </Grid>
    </div>
  ) : null;
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
