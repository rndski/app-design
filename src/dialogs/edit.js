import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { appContext } from "../components/store";
import UserService, { AppActions } from "../data/service";
import { Typography, Slide } from "@material-ui/core";
import UserGeneral from "./general";
import UserAddress from "./address";

const styles = {
  avatar: {
    width: 60,
    height: 60
  },

  container: {
    display: "flex",
    alignContent: "flex-start",
    alignItems: "center",
    textTransform: "capitalize"
  },
  item: {
    margin: "auto"
  }
};

function TabContainer(props) {
  return (
    <Slide in={true}>
      <Typography
        component="div"
        style={{ minHeight: 240, maxHeight: 300, maxWidth: 400 }}
      >
        {props.children}
      </Typography>
    </Slide>
  );
}

const EditUser = React.memo(props => {
  const {
    edit,
    edit: { open, user: item /*, isNew*/ }, //grabbing the edit.user property into item
    classes
  } = props;

  if (!open) return null;

  const [user, setUser] = useState(item);
  const [activeTab, setActiveTab] = useState(0);
  const appDispatch = useContext(appContext);

  const handleClose = () => {
    appDispatch({
      type: AppActions.CANCEL
    });
  };

  const handleSave = e => {
    e.preventDefault();
    UserService.save(appDispatch, edit, user);
  };

  const onTabChange = (e, tab) => {
    setActiveTab(tab);
  };

  const onChange = e => {
    switch (e.target.id) {
      case "first":
      case "last":
        setUser({
          ...user,
          name: { ...user.name, [e.target.id]: e.target.value }
        });
        break;
      case "street":
      case "city":
      case "state":
      case "postcode":
        setUser({
          ...user,
          location: { ...user.location, [e.target.id]: e.target.value }
        });
        break;
      case "date":
        setUser({
          ...user,
          dob: { ...user.dob, [e.target.id]: e.target.value }
        });
        break;

      case "email":
      case "gender":
        setUser({ ...user, [e.target.id]: e.target.value });
        break;
      default:
        console.log("not updating " + e.target.id);
    }
  };

  //const contentText = isNew ? "New" : "Edit";
  const name = `${user.name.first} ${user.name.last}`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSave}>
        <DialogTitle id="form-dialog-title">
          <div className={classes.container}>
            <Avatar
              alt={name}
              src={user.picture.large}
              className={classes.avatar}
              style={{ flexGrow: 0 }}
            />

            <div
              className={classes.item}
              style={{ flexGrow: 1, marginLeft: 10 }}
            >
              <Typography variant="h5">{name}</Typography>
              <Typography variant="subtitle2" className={classes.item}>
                {user.dob.age}
              </Typography>
            </div>
          </div>
          <Tabs
            onChange={onTabChange}
            value={activeTab}
            indicatorColor="primary"
            textColor="secondary"
            centered
          >
            <Tab value={0} label="General" />
            <Tab value={1} label="Address" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          {activeTab === 0 && (
            <TabContainer>
              <UserGeneral user={user} onChange={onChange} />
            </TabContainer>
          )}

          {activeTab === 1 && (
            <TabContainer>
              <UserAddress user={user} onChange={onChange} />
            </TabContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSave}
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

EditUser.propTypes = {
  edit: PropTypes.object
};

export default withStyles(styles)(EditUser);
