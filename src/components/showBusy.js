import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import { Button } from "@material-ui/core";
// import uiContext from "../context/ui";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
    backgroundColor: "#e3f2fd"
  }
});

const ShowBusy = props => {
  const { /*classes*/ busy } = props;
  //const dispatch = useContext(uiContext);

  useEffect(() => {
    console.log("ShowBusy: useEffect(mounted)");
    return () => {
      console.log("ShowBusy: useEffect(unmounted)");
    };
  }, []);

  console.log("ShowBusy.Render()");
  return (
    <React.Fragment>
      <div>SHOW BUSY ({busy ? "true" : "false"})</div>
    </React.Fragment>
  );
};

ShowBusy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowBusy);
