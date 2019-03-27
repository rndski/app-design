import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Switch } from "@material-ui/core";

import uiContext from "../context/ui";
import { UIActions } from "../reducers/uiReducer";
import { DataActions } from "../reducers/dataReducer";
import dataContext from "../context/data";
import loadUserData from "../data/loadUsers";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    height: 40
  }
});

const Busy = ({ classes, busy }) => {
  const uiDispatch = useContext(uiContext);
  const dataDispatch = useContext(dataContext);

  useEffect(() => {
    console.log("Busy: useEffect(mounted)");
    return () => {
      console.warn("Busy: useEffect(unmounted)");
    };
  }, []);

  const makeBusy = () => {
    uiDispatch({ type: UIActions.TOGGLE_BUSY });
    setTimeout(() => {
      uiDispatch({ type: UIActions.TOGGLE_BUSY });
    }, 1500);
  };

  const toggleBusy = () => {
    uiDispatch({ type: UIActions.TOGGLE_BUSY });
  };

  const load = () => {
    uiDispatch({ type: UIActions.BUSY, busy: true });
    loadUserData(25)
      .then(res => {
        //console.log("got:", res.data.results);
        setTimeout(() => {
          dataDispatch({ type: DataActions.ADD, payload: res.data.results });
          uiDispatch({ type: UIActions.BUSY, busy: false });
        }, 2000);
      })
      .catch(e => {
        console.log("Something went wrong with getting the users... :(", e);
        throw e;
      });
  };

  const addUser = () => {
    dataDispatch({
      type: DataActions.ADD,
      payload: [
        {
          name: { first: "Vaughan", last: "Koscinski" },
          email: "boss@madden.com"
        }
      ]
    });
  };

  const clear = () => {
    dataDispatch({
      type: DataActions.CLEAR
    });
  };

  //console.log("Busy.Render()");

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Button onClick={makeBusy} color="secondary">
          Busy
        </Button>
        <Switch checked={busy} onChange={toggleBusy} />
        <Button onClick={load} color="primary">
          Load
        </Button>
        <Button onClick={addUser} color="secondary">
          Add
        </Button>
        <Button onClick={clear} color="primary">
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
