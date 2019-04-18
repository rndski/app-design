import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const UserGeneral = ({ user, onChange, strings }) => {
  return (
    <React.Fragment>
      <TextField
        id="first"
        label={strings.firstName}
        type="text"
        fullWidth
        required
        value={user.name.first}
        onChange={onChange}
      />
      <TextField
        id="last"
        label={strings.lastName}
        type="text"
        fullWidth
        required
        value={user.name.last}
        onChange={onChange}
      />
      <TextField
        id="gender"
        label={strings.gender}
        type="text"
        fullWidth
        required
        value={user.gender}
        onChange={onChange}
      />
      <TextField id="email" label={strings.email} type="email" fullWidth value={user.email} onChange={onChange} />
      <TextField
        id="date"
        label={strings.dob}
        type="date"
        fullWidth
        value={user.dob.date.split("T")[0]}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    strings: state.strings.general
  };
};
UserGeneral.propTypes = {
  user: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UserGeneral);
