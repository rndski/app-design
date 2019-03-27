import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    backgroundColor: "#f5f5f5"
  }
});

const Content = ({ classes, name, children }) => {
  useEffect(() => {
    console.log(`Content-${name}: useEffect(mounted)`);
    return () => {
      console.warn(`Content-${name}: useEffect(unmounted)`);
    };
  }, []);

  //console.log("Content.Render()");
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h3">
          {name}
        </Typography>
        {children}
      </Paper>
    </React.Fragment>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
