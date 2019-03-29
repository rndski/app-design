import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  typography: {
    marginRight: 10
  }
};

const Header = ({ classes, children, busy }) => {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {busy ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <Typography
            className={classes.typography}
            variant="h6"
            color="inherit"
          >
            Users
          </Typography>
        </Toolbar>
        {children}
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Header);
