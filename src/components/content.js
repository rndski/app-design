import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
    backgroundColor: "#bbdefb"
  }
});

const Content = props => {
  const { classes, name } = props;

  useEffect(() => {
    console.log(`Content-${name}: useEffect(mounted)`);
    return () => {
      console.log(`Content-${name}: useEffect(unmounted)`);
    };
  }, []);

  console.log("Content.Render()");
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Content
        </Typography>
        {props.children}
      </Paper>
    </React.Fragment>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
