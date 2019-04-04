import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { appContext } from "../components/store";
import UserService from "../data/service";

const styles = {
  root: {
    height: 40,
    display: "flex",
    padding: 5,
    justifyContent: "center"
  }
};

const Actions = ({ classes, count }) => {
  const appDispatch = useContext(appContext);

  useEffect(() => {
    UserService.load(appDispatch, 50);
  }, []);

  return (
    <React.Fragment>
      <Paper className={classes.root} square={true} elevation={0}>
        <Button
          onClick={() => {
            UserService.load(appDispatch);
          }}
          color="primary"
        >
          Load
        </Button>
        <Button
          onClick={() => {
            UserService.new(appDispatch);
          }}
          color="primary"
        >
          New
        </Button>
        <Button
          onClick={() => {
            UserService.clear(appDispatch);
          }}
          color="secondary"
        >
          Clear
        </Button>
      </Paper>
    </React.Fragment>
  );
};

Actions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Actions);
