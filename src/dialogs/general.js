import React from "react";
import propTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const UserGeneral = ({ user, onChange }) => {
  return (
    <React.Fragment>
      <TextField
        id="first"
        label="first name"
        type="text"
        fullWidth
        required
        value={user.name.first}
        onChange={onChange}
      />
      <TextField
        id="last"
        label="last name"
        type="text"
        fullWidth
        required
        value={user.name.last}
        onChange={onChange}
      />
      <TextField
        id="gender"
        label="gender"
        type="text"
        fullWidth
        required
        value={user.gender}
        onChange={onChange}
      />
      <TextField
        id="email"
        label="email address"
        type="email"
        fullWidth
        value={user.email}
        onChange={onChange}
      />
      <TextField
        id="date"
        label="dob"
        type="date"
        fullWidth
        value={user.dob.date.split("T")[0]}
        onChange={onChange}
        InputProps={{
          readOnly: true
        }}
      />
    </React.Fragment>
  );
};

UserGeneral.propTypes = {
  user: propTypes.object.isRequired
};

export default UserGeneral;
