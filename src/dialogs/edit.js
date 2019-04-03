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
import UserService, { AppActions } from "../data/service";

const EditUser = React.memo(props => {
  const {
    edit,
    edit: { open, user: item, isNew } //grabbing the edit.user property into item
  } = props;

  if (!open) return null;

  const [user, setUser] = useState(item);
  const appDispatch = useContext(appContext);

  const handleClose = () => {
    appDispatch({
      type: AppActions.CANCEL
    });
  };

  const handleSave = e => {
    e.preventDefault();
    UserService.save(appDispatch, edit, user);
  };

  const onNameChange = e => {
    setUser({ ...user, name: { ...user.name, [e.target.id]: e.target.value } });
  };
  const onOtherChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const contentText = isNew ? "New" : "Update";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSave}>
        <DialogTitle id="form-dialog-title">{contentText}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`${user.name.first} ${
            user.name.last
          }`}</DialogContentText>
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
          <Button type="submit" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

EditUser.propTypes = {
  edit: PropTypes.object
};

export default EditUser;
