import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FilterList from "@material-ui/icons/FilterList";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UserService from "../data/service";
import Filter from "../dialogs/filter";
import { TOGGLE_FILTER } from "../reducers/filter";
import { useTheme } from "../providers/theme";

const styles = {
  root: {
    height: 50,
    display: "flex",
    padding: 5,
    justifyContent: "center"
  },
  filtered: {
    backgroundColor: green[900]
  }
};

const Actions = ({ classes, dispatch, strings, filtered }) => {
  useEffect(() => {
    UserService.load(dispatch, 15);
  }, []);

  const actions = [
    {
      action: () => {
        UserService.load(dispatch);
      },
      text: strings.load,
      color: "primary"
    },
    {
      action: () => {
        UserService.new(dispatch);
      },
      text: strings.new,
      color: "primary"
    },
    {
      action: () => {
        UserService.clear(dispatch);
      },
      text: strings.clear,
      color: "secondary"
    }
  ];

  const toggle = e => {
    dispatch({ type: TOGGLE_FILTER, payload: { anchor: e.target } });
  };

  const [theme] = useTheme();
  const style = filtered ? { backgroundColor: theme.theme.palette.primary[100] } : {};

  return (
    <Paper className={classes.root} square={true} elevation={0}>
      {actions.map(item => {
        return (
          <Button key={item.text} color={item.color} onClick={item.action}>
            {item.text}
          </Button>
        );
      })}

      <IconButton style={style} onClick={toggle}>
        <FilterList fontSize="small" color="primary" />
      </IconButton>

      <Filter />
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    strings: state.strings.actions,
    filtered: state.filter.filtered
  };
};
Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtered: PropTypes.bool.isRequired
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Actions);
