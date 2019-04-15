import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
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

import UserService from "../data/service";
import { Typography, Slide } from "@material-ui/core";
import UserGeneral from "./general";
import UserAddress from "./address";

import { EDIT_CANCEL } from "../reducers/edit";

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

const EditUser = React.memo(({ dispatch, classes, edit, strings }) => {
  const { open } = edit;

  if (!open) return null;

  const [user, setUser] = useState(edit.user);
  const [activeTab, setActiveTab] = useState(0);

  const handleClose = () => {
    dispatch({
      type: EDIT_CANCEL
    });
  };

  const handleSave = e => {
    e.preventDefault();
    UserService.save(dispatch, edit, user);
  };

  const onTabChange = (e, tab) => {
    setActiveTab(tab);
  };

  const getAge = birthday => {
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
          dob: {
            ...user.dob,
            [e.target.id]: e.target.value,
            age: getAge(e.target.value)
          }
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
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.item}
              >
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
            <Tab value={0} label={strings.general} />
            <Tab value={1} label={strings.address} />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          <TabContainer>
            {activeTab === 0 && <UserGeneral user={user} onChange={onChange} />}
            {activeTab === 1 && <UserAddress user={user} onChange={onChange} />}
          </TabContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSave}
            color="secondary"
          >
            {strings.save}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

const mapStateToProps = state => {
  return {
    edit: state.edit,
    strings: { ...state.strings.detail, ...state.strings.global }
  };
};
EditUser.propTypes = {
  edit: PropTypes.object
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EditUser);
