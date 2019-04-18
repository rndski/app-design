import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    marginTop: 110,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: "calc(100vh - 95px)"
  }
};

const Content = ({ classes, children }) => {
  return (
    <Paper className={classes.root} elevation={1}>
      {children}
    </Paper>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
};

export default withStyles(styles)(Content);
