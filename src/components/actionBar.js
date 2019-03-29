import React, { useState, useEffect } from "react";
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

const ActionBar = React.memo(props => {
  const { message = "", messageKey, classes } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [messageKey, message]);

  const onClose = (e, r) => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open && message.length > 0}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={1500}
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

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  messageKey: PropTypes.number.isRequired
};

export default withStyles(styles)(ActionBar);
