import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import uiContext from "../context/ui";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
    backgroundColor: "#e3f2fd"
  }
});

const Busy = props => {
  const { classes } = props;
  const dispatch = useContext(uiContext);

  useEffect(() => {
    console.log("Busy: useEffect(mounted)");
    return () => {
      console.log("Busy: useEffect(unmounted)");
    };
  }, []);

  const toggleBusy = () => {
    dispatch({ type: "toggle-busy" });
    setTimeout(() => {
      dispatch({ type: "toggle-busy" });
    }, 1500);
  };
  console.log("Busy.Render()");
  console.log("------------------");
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Button onClick={toggleBusy} color="primary">
          Busy
        </Button>
      </Paper>
    </React.Fragment>
  );
};

Busy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Busy);
