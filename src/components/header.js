import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import PersonOutlineRounded from "@material-ui/icons/PersonOutlineRounded";
import Tooltip from "@material-ui/core/Tooltip";

import { OPEN_MENU } from "../reducers/menu";

const styles = {
  root: {
    flexGrow: 1
  },
  users: {
    flexGrow: 1,
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
};

const Header = ({ classes, children, count, busy, dispatch }) => {
  const onMenu = event => {
    dispatch({ type: OPEN_MENU, payload: { anchor: event.target } });
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenu}
          >
            {busy ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <MenuIcon />
            )}
          </IconButton>

          <Typography variant="h6" color="inherit">
            Users
          </Typography>
          <div className={classes.users}>
            <Badge badgeContent={count} color="secondary">
              <PersonOutlineRounded />
            </Badge>
          </div>
          <Tooltip title="Coming Soon!" aria-label="Coming Soon!">
            <Button color="inherit">Login</Button>
          </Tooltip>
        </Toolbar>
        {children}
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  busy: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    count: state.data.users.length,
    busy: state.app.busy
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Header);
