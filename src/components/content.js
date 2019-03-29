import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    marginTop: 105,
    minHeight: "calc(100vh - 105px)"
  }
};

const Content = ({ classes, name, children, show }) => {
  return show ? (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h3">
          {name}
        </Typography>
        {children}
      </Paper>
    </React.Fragment>
  ) : null;
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  children: PropTypes.object,
  show: PropTypes.bool.isRequired
};

export default withStyles(styles)(Content);
