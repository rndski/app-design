import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import appContext from "../context/app";
import { AppActions } from "../reducers/appReducer";

const EditUser = React.memo(({ open, item }) => {
  if (!open) return null;

  const appDispatch = useContext(appContext);

  const [user, setUser] = useState(item);

  const handleClose = () => {
    appDispatch({
      type: AppActions.EDIT,
      payload: {
        edit: {
          user: {},
          open: false
        }
      }
    });
  };

  const handleSave = () => {
    appDispatch({
      type: AppActions.SAVE,
      payload: {
        edit: {
          user: { ...user },
          open: false
        },
        message: `${user.name.first} ${user.name.last} has been updated...`
      }
    });
  };

  const onNameChange = e => {
    setUser({ ...user, name: { ...user.name, [e.target.id]: e.target.value } });
  };
  const onOtherChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  console.log("render");
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {`${user.name.first} ${user.name.last}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Modify the user's details.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="first"
          label="first name"
          type="text"
          fullWidth
          value={user.name.first}
          onChange={onNameChange}
        />
        <TextField
          margin="dense"
          id="last"
          label="last name"
          type="text"
          fullWidth
          value={user.name.last}
          onChange={onNameChange}
        />
        <TextField
          margin="dense"
          id="email"
          label="email address"
          type="email"
          fullWidth
          value={user.email}
          onChange={onOtherChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
});

EditUser.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool.isRequired
};

export default EditUser;
