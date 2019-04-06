import React, { useContext } from "react";
import propTypes from "prop-types";

import Popover from "@material-ui/core/Popover";
import CardMedia from "@material-ui/core/CardMedia";

import { appContext } from "../components/store";
import { AppActions } from "../data/service";

const UserPopover = ({ open, image, anchor }) => {
  if (!open) return null;

  const appDispatch = useContext(appContext);

  const onClose = () => {
    appDispatch({ type: AppActions.POPOVER });
  };
  return (
    <Popover open={open} anchorEl={anchor} onClose={onClose}>
      <CardMedia style={{ height: 250, width: 250 }} image={image} />
    </Popover>
  );
};

UserPopover.propTypes = {
  open: propTypes.bool.isRequired,
  image: propTypes.string.isRequired,
  anchor: propTypes.object.isRequired
};

export default UserPopover;
