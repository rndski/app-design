import React from "react";
import { useTheme } from "./theme";
import { Button } from "@material-ui/core";

const Nest = () => {
  const [, dispatch] = useTheme();

  return (
    <Button
      onClick={() => {
        dispatch({});
      }}
    >
      X
    </Button>
  );
};
export default () => {
  const [state] = useTheme();
  console.log("fake render");
  return (
    <div>
      FAKE THEME: {state.theme} <Nest />
    </div>
  );
};
