import React, { useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import dataContext from "../context/data";
import { DataActions } from "../reducers/dataReducer";
//import uiContext from "../context/ui";

const styles = theme => ({
  card: {
    width: 320,
    textAlign: "left"
  },
  actions: {
    display: "flex"
  }
});

const Users = React.memo(({ users, classes }) => {
  const dataDispatch = useContext(dataContext);
  //const uiDispatch = useContext(uiContext);

  console.log("Cards Container Render", classes);

  const deleteUser = email => {
    //uiDispatch({ type: UIActions.BUSY, busy: true });
    dataDispatch({ type: DataActions.DELETE, email });
    //uiDispatch({ type: UIActions.BUSY, busy: false });
  };

  const userItems = users.map(item => {
    console.log("Card");
    return (
      <Grid item key={item.email}>
        <Card xs={12} sm={6} md={4} lg={3} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="">{item.name.last[0].toUpperCase()} </Avatar>
            }
            action={
              <IconButton
                className={classes.actions}
                onClick={() => {
                  deleteUser(item.email);
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

  useEffect(() => {
    console.log("%c%s: useEffect(mounted)", "color:red", "Users");
    return () => {
      console.warn("+++ Users: useEffect(unmounted)");
    };
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      spacing={24}
    >
      {userItems}
    </Grid>
  );
});

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
