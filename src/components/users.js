import React from "react";
import PropTypes from "prop-types";

import User from "./user";
import Grid from "@material-ui/core/Grid";

const Users = ({ users }) => {
  return users.length > 0 ? (
    <div style={{ padding: 15 }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        alignContent="space-around"
        spacing={32}
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
