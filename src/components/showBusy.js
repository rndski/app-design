import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";

const ShowBusy = props => {
  useEffect(() => {
    console.log("%c%s: useEffect(mounted)", "color:red", "ShowBusy");
    return () => {
      console.warn("+++ ShowBusy: useEffect(unmounted)");
    };
  }, []);

  //console.log("ShowBusy.Render()");
  return props.busy ? (
    <Paper style={{ backgroundColor: "#448aff" }}>!!! BUSY!!! </Paper>
  ) : null;
};

export default ShowBusy;
