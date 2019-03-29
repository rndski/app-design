import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import appContext from "../context/app";
import { AppActions } from "../reducers/appReducer";

const styles = {
  card: {
    width: 320,
    textAlign: "left"
  },
  actions: {
    display: "flex"
  }
};

const User = React.memo(props => {
  const { item, classes } = props;
  const appDispatch = useContext(appContext);

  console.log("User Render");

  const deleteUser = item => {
    appDispatch({
      type: AppActions.DELETE,
      payload: {
        uuid: item.login.uuid,
        message: `${item.name.first} ${item.name.last} has been deleted...`
      }
    });
  };

  return (
    <Grid item>
      <Card xs={12} sm={6} md={4} lg={4} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="">{item.name.last[0].toUpperCase()} </Avatar>
          }
          action={
            <IconButton
              className={classes.actions}
              onClick={() => {
                deleteUser(item);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
          title={`${item.name.first} ${item.name.last}`}
          subheader={item.email}
        />
      </Card>
    </Grid>
  );
});

User.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
