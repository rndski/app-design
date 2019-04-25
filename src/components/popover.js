import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Popover from "@material-ui/core/Popover";
import CardMedia from "@material-ui/core/CardMedia";

import { CLOSE_PROFILE_PIC } from "../reducers/popover";

const UserPopover = ({ open, image, anchor, dispatch }) => {
  if (!open) return null;

  const onClose = () => {
    dispatch({ type: CLOSE_PROFILE_PIC });
  };
  return (
    <Popover open={open} anchorEl={anchor} onClose={onClose}>
      <CardMedia style={{ height: 275, width: 275 }} image={image} />
    </Popover>
  );
};

const mapStateToProps = state => {
  return {
    open: state.popover.open,
    anchor: state.popover.anchor,
    image: state.popover.image
  };
};

UserPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  anchor: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UserPopover);
