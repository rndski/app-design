import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { appContext, themeContext } from "../components/store";
import { userThemes } from "../reducers/themeReducer";

import { AppActions } from "../data/service";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  avatar: {
    margin: 10,
    height: 20,
    width: 20
  }
};

const UserMenu = ({ anchor, open, classes }) => {
  const appDispatch = useContext(appContext);
  const themeDispatch = useContext(themeContext);

  const handleClose = () => {
    appDispatch({
      type: AppActions.MENU,
      payload: {
        open: false,
        anchor: null
      }
    });
  };

  return (
    <div>
      <Menu
        id="color-menu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
      >
        {userThemes.map(item => {
          return (
            <MenuItem
              key={item.name}
              onClick={() => {
                themeDispatch({ type: item.name });
                handleClose();
              }}
            >
              <Avatar
                style={{ backgroundColor: item.color }}
                className={classes.avatar}
              />
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(UserMenu);
