import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UserService from "../data/service";

const styles = {
  root: {
    height: 40,
    display: "flex",
    padding: 5,
    justifyContent: "center"
  }
};

const Actions = ({ classes, dispatch }) => {
  useEffect(() => {
    UserService.load(dispatch, 50);
  }, []);

  return (
    <React.Fragment>
      <Paper className={classes.root} square={true} elevation={0}>
        <Button
          onClick={() => {
            UserService.load(dispatch);
          }}
        >
          Load
        </Button>
        <Button
          onClick={() => {
            UserService.new(dispatch);
          }}
        >
          New
        </Button>
        <Button
          onClick={() => {
            UserService.clear(dispatch);
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

export default compose(
  connect(),
  withStyles(styles)
)(Actions);
