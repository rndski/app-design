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

const Actions = ({ classes, dispatch, strings }) => {
  useEffect(() => {
    UserService.load(dispatch, 50);
  }, []);

  const actions = [
    {
      action: () => {
        UserService.load(dispatch);
      },
      text: strings.load,
      color: "primary"
    },
    {
      action: () => {
        UserService.new(dispatch);
      },
      text: strings.new,
      color: "primary"
    },
    {
      action: () => {
        UserService.clear(dispatch);
      },
      text: strings.clear,
      color: "secondary"
    }
  ];
  return (
    <Paper className={classes.root} square={true} elevation={0}>
      {actions.map(item => {
        return (
          <Button key={item.text} color={item.color} onClick={item.action}>
            {item.text}
          </Button>
        );
      })}
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    strings: state.strings.actions
  };
};
Actions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Actions);
