import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const UserAddress = ({ user, onChange, strings }) => {
  return (
    <React.Fragment>
      <TextField
        id="street"
        label={strings.street}
        type="text"
        fullWidth
        value={user.location.street}
        onChange={onChange}
      />
      <TextField
        id="city"
        label={strings.city}
        type="text"
        fullWidth
        value={user.location.city}
        onChange={onChange}
      />
      <TextField
        id="state"
        label={strings.state}
        type="text"
        fullWidth
        value={user.location.state}
        onChange={onChange}
      />
      <TextField
        id="postcode"
        label={strings.postcode}
        type="text"
        fullWidth
        value={user.location.postcode}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    strings: state.strings.address
  };
};
UserAddress.propTypes = {
  user: propTypes.object.isRequired
};

export default connect(mapStateToProps)(UserAddress);
