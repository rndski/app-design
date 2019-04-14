import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme, userThemes, CHANGE_THEME } from "../providers/theme";
import Avatar from "@material-ui/core/Avatar";
import { CLOSE_MENU } from "../reducers/menu";

const styles = {
  avatar: {
    margin: 10,
    height: 20,
    width: 20
  }
};

const UserMenu = ({ anchor, open, classes, dispatch }) => {
  const handleClose = () => {
    dispatch({ type: CLOSE_MENU });
  };

  const [, themeDispatch] = useTheme();

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
                themeDispatch({ type: CHANGE_THEME, payload: item.name });
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

const mapStateToProps = state => {
  return {
    open: state.menu.open,
    anchor: state.menu.anchor
  };
};

UserMenu.propTypes = {
  open: propTypes.bool,
  anchor: propTypes.object,
  classes: propTypes.object.isRequired
};
export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(UserMenu);
