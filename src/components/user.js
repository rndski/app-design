import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";

import UserService from "../data/service";
import { OPEN_PROFILE_PIC } from "../reducers/popover";

const styles = {
  card: {
    width: 325,
    textAlign: "left",
    textTransform: "capitalize"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
};

const User = React.memo(({ item, classes, dispatch, strings }) => {
  const [zoom, setZoom] = useState(true);

  const onDelete = () => {
    setZoom(false);
    setTimeout(() => {
      UserService.delete(dispatch, item);
    }, 250);
  };
  const openProfilePic = e => {
    dispatch({
      type: OPEN_PROFILE_PIC,
      payload: { anchor: e.target, image: item.picture.large }
    });
  };
  return (
    <Grid item>
      <Zoom in={zoom}>
        <Card xs={12} sm={6} md={4} lg={4} className={classes.card}>
          <CardHeader
            avatar={<Avatar onClick={openProfilePic} aria-label="" src={item.picture.large} />}
            title={<Typography variant="inherit">{`${item.name.first} ${item.name.last}`}</Typography>}
            subheader={
              <Typography color="textSecondary" variant="subtitle2">
                {item.dob.age}
              </Typography>
            }
          />

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              onClick={() => {
                UserService.edit(dispatch, item);
              }}
            >
              {strings.details}
            </Button>
            <Button color="secondary" onClick={onDelete}>
              {strings.delete}
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </Grid>
  );
});

const mapStateToProps = state => {
  return {
    strings: { ...state.strings.card, ...state.strings.global }
  };
};
User.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(User);
