import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import User from "./user";
import Grid from "@material-ui/core/Grid";

const filterUsers = (users, filter) => {
  if (!filter.filtered) return users;

  return users
    .filter(user => {
      if (filter.gender) return user.gender === filter.gender;
      return true;
    })
    .filter(user => {
      if (filter.name)
        return (
          user.name.last.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0 ||
          user.name.first.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0
        );
      return true;
    });
};
const Users = ({ users, filter }) => {
  const filtered = filterUsers(users, filter);
  return (
    <Grid container direction="row" justify="center" alignItems="stretch" alignContent="space-between" spacing={32}>
      {filtered.map(item => {
        return <User key={item.login.uuid} item={item} />;
      })}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    users: state.data.users,
    filter: state.filter
  };
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Users);
