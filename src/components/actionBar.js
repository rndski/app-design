import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  close: {
    padding: 5
  }
};

const ActionBar = React.memo(({ message, classes }) => {
  if (message === undefined) return null;

  const [open, setOpen] = useState(true);

  const onClose = (e, r) => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={2500}
      onClose={onClose}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      message={<span id="message-id">{message}</span>}
    />
  );
});

const mapStateToProps = state => {
  return {
    message: state.app.message
  };
};

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ActionBar);
