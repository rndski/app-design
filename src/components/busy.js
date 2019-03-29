import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import PersonOutlineRounded from "@material-ui/icons/PersonOutlineRounded";
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

  const load = () => {
    appDispatch({ type: AppActions.BUSY, busy: true });
    loadUserData(15)
      .then(res => {
        const payload = {
          users: res.data.results,
          message: `Loaded ${res.data.results.length} new users...`,
          busy: false
        };
        dispatchWithDelay(AppActions.ADD, payload);
      })
      .catch(e => {
        console.log("Something went wrong with getting the users... :(", e);
        throw e;
      });
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
          login: { uuid: uuidv4() }
        }
      ]
    };
    dispatchWithDelay(AppActions.ADD, payload);
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
      <Paper className={classes.root} square={true} elevation={1}>
        {/* <Button onClick={makeBusy} color="secondary">
          Busy
        </Button>
		<Switch checked={busy} onChange={toggleBusy} /> */}

        <div style={{ paddingTop: 6, paddingRight: 10 }}>
          <Badge
            className={classes.margin}
            badgeContent={count}
            color="secondary"
          >
            <PersonOutlineRounded />
          </Badge>
        </div>

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
