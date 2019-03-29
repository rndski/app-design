import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { AppActions } from "../reducers/appReducer";
import appContext from "../context/app";

import loadUserData from "../data/loadUsers";
import uuidv4 from "uuid/v4";

const styles = {
  root: {
    height: 40,
    display: "flex",
    padding: 5,
    justifyContent: "center"
  }
};

const Busy = ({ classes, count }) => {
  const appDispatch = useContext(appContext);

  const dispatchWithDelay = (type, payload, delay = 300) => {
    setTimeout(() => {
      appDispatch({
        type,
        payload
      });
    }, delay);
  };

  const load = async () => {
    appDispatch({ type: AppActions.BUSY, busy: true });

    try {
      const res = await loadUserData(15);
      const payload = {
        users: res.data.results,
        message: `Loaded ${res.data.results.length} new users...`,
        busy: false
      };
      dispatchWithDelay(AppActions.ADD, payload);
    } catch (e) {
      const payload = {
        message: `Something went wrong with getting the users... :(`,
        busy: false
      };
      dispatchWithDelay(AppActions.ERROR, payload);
    }
  };

  const add = () => {
    appDispatch({ type: AppActions.BUSY, busy: true });

    const payload = {
      busy: false,
      message: "Vaughan Koscinski has been added...",
      users: [
        {
          name: { first: "Vaughan", last: "Koscinski" },
          email: "boss@madden.com",
          gender: "male",
          login: { uuid: uuidv4() }
        }
      ]
    };
    dispatchWithDelay(AppActions.ADD, payload, 750);
  };

  const error = () => {
    appDispatch({ type: AppActions.BUSY, busy: true });

    const payload = {
      message: `Testing the error reducer... :(`,
      busy: false
    };
    dispatchWithDelay(AppActions.ERROR, payload, 3000);
  };
  const clear = () => {
    const payload = {
      users: [],
      message: "Users have been cleared..."
    };

    dispatchWithDelay(AppActions.CLEAR, payload);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} square={true} elevation={0}>
        <Button onClick={load} color="primary">
          Load
        </Button>
        <Button onClick={add} color="primary">
          Add
        </Button>
        <Button onClick={clear} color="secondary">
          Clear
        </Button>
        <Button onClick={error} color="secondary">
          Error
        </Button>
      </Paper>
    </React.Fragment>
  );
};

Busy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Busy);
