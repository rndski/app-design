import React from "react";
import PropTypes from "prop-types";

import User from "./user";
import Grid from "@material-ui/core/Grid";

const Users = ({ users }) => {
  const filtered = users;

  // const filtered = users.filter(item => {
  //   return item.gender === "female";
  // });

  return (
    <div style={{ paddingTop: 25, paddingBottom: 25 }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        alignContent="space-between"
        spacing={32}
      >
        {filtered.map(item => {
          return <User key={item.login.uuid} item={item} />;
        })}
      </Grid>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
