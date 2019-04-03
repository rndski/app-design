import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";

import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import appContext from "../context/app";
import UserService from "../data/service";

const styles = {
  card: {
    width: 325,
    textAlign: "left"
  },
  actions: {
    display: "flex-grow"
  },
  blueAvatar: {
    color: blue[900],
    backgroundColor: blue[50]
  },
  pinkAvatar: {
    color: pink[900],
    backgroundColor: pink[50]
  }
};

const User = React.memo(props => {
  const { item, classes } = props;
  const appDispatch = useContext(appContext);
  const [zoom, setZoom] = useState(true);

  const onDelete = () => {
    setZoom(false);
    setTimeout(() => {
      UserService.delete(appDispatch, item);
    }, 250);
  };

  return (
    <Grid item>
      <Zoom in={zoom}>
        <Card xs={12} sm={6} md={4} lg={4} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                className={
                  item.gender === "male"
                    ? classes.blueAvatar
                    : classes.pinkAvatar
                }
                aria-label=""
              >
                {item.name.last[0].toUpperCase()}
              </Avatar>
            }
            action={<React.Fragment />}
            title={`${item.name.first} ${item.name.last}`}
            subheader={item.email}
          />

          <CardActions>
            <Button
              onClick={() => {
                UserService.edit(appDispatch, item);
              }}
            >
              Edit
            </Button>
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </Grid>
  );
});

User.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
