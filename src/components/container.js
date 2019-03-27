import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 6,
    height: "100vh",
    overflow: "scroll"
  }
});

const Container = ({ classes, name, primary, children }) => {
  useEffect(() => {
    console.log(`Container-${name}: useEffect(mounted)`);
    return () => {
      console.warn(`Container-${name}: useEffect(unmounted)`);
    };
  }, []);

  //console.log(`${name}:Container.Render()`);
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h3">{name}</Typography>
        {children}
      </Paper>
    </React.Fragment>
  );
};

Container.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
