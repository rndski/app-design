import React from "react";
import propTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const UserAddress = ({ user, onChange }) => {
  return (
    <React.Fragment>
      <TextField
        id="street"
        label="street"
        type="text"
        fullWidth
        value={user.location.street}
        onChange={onChange}
      />
      <TextField
        id="city"
        label="city"
        type="text"
        fullWidth
        value={user.location.city}
        onChange={onChange}
      />
      <TextField
        id="state"
        label="state"
        type="text"
        fullWidth
        value={user.location.state}
        onChange={onChange}
      />
      <TextField
        id="postcode"
        label="postcode"
        type="text"
        fullWidth
        value={user.location.postcode}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

UserAddress.propTypes = {
  user: propTypes.object.isRequired
};

export default UserAddress;
