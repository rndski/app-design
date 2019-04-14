import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

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
      <CardMedia style={{ height: 250, width: 250 }} image={image} />
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
  open: propTypes.bool.isRequired,
  image: propTypes.string.isRequired,
  anchor: propTypes.object.isRequired
};

export default connect(mapStateToProps)(UserPopover);
