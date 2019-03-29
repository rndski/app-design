import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  close: {
    padding: 5
  }
};

const ActionBar = props => {
  const { message = "", classes } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const onClose = (e, r) => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open && message.length > 0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={4000}
      onClose={onClose}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
        >
          <CloseIcon />
        </IconButton>
      ]}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default withStyles(styles)(ActionBar);
