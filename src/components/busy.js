import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import uiContext from "../context/ui";
import { UIActions } from "../reducers/uiReducer";
import { DataActions } from "../reducers/dataReducer";
import dataContext from "../context/data";
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

const Busy = ({ classes, busy }) => {
  const uiDispatch = useContext(uiContext);
  const dataDispatch = useContext(dataContext);

  // const makeBusy = () => {
  //   uiDispatch({ type: UIActions.TOGGLE_BUSY });
  //   setTimeout(() => {
  //     uiDispatch({ type: UIActions.TOGGLE_BUSY });
  //   }, 1500);
  // };

  // const toggleBusy = () => {
  //   uiDispatch({ type: UIActions.TOGGLE_BUSY });
  // };

  const load = () => {
    uiDispatch({
      type: UIActions.BUSY,
      busy: true,
      message: "Loading Users..."
    });

    loadUserData(25)
      .then(res => {
        dataDispatch({ type: DataActions.ADD, payload: res.data.results });
        const action = `Loaded ${res.data.results.length} users...`;
        uiDispatch({ type: UIActions.BUSY, busy: false, action });
      })
      .catch(e => {
        console.log("Something went wrong with getting the users... :(", e);
        throw e;
      });
  };

  const add = () => {
    uiDispatch({ type: UIActions.BUSY, busy: true });

    setTimeout(() => {
      dataDispatch({
        type: DataActions.ADD,
        payload: [
          {
            name: { first: "Vaughan", last: "Koscinski" },
            email: "boss@madden.com",
            login: { uuid: uuidv4() }
          }
        ]
      });

      uiDispatch({
        type: UIActions.BUSY,
        busy: false,
        action: "User created..."
      });
    });
  };

  const clear = () => {
    dataDispatch({
      type: DataActions.CLEAR
    });
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} square={true} elevation={1}>
        {/* <Button onClick={makeBusy} color="secondary">
          Busy
        </Button>
        <Switch checked={busy} onChange={toggleBusy} /> */}
        <Button onClick={load} color="primary">
          Load
        </Button>
        <Button onClick={add} color="primary">
          Add
        </Button>
        <Button onClick={clear} color="secondary">
          Clear
        </Button>
      </Paper>
    </React.Fragment>
  );
};

Busy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Busy);
