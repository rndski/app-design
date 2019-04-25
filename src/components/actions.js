import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilterList from "@material-ui/icons/FilterList";
import SortIcon from "@material-ui/icons/Sort";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UserService from "../data/service";
import Filter from "../dialogs/filter";
import { TOGGLE_FILTER } from "../reducers/filter";
import { SORT_USERS } from "../reducers/data";
import { useTheme } from "../providers/theme";

const styles = {
  root: {
    height: 50,
    display: "flex",
    padding: 5,
    justifyContent: "center"
  },
  rotated: {
    webkitTransform: "rotate(180deg)",
    mozTransform: "rotate(180deg)",
    msTransform: "rotate(180deg)",
    oTransform: "rotate(180deg)",
    transform: "rotate(180deg)",
    display: "inline-block"
  }
};

const Actions = ({ classes, dispatch, strings, filtered, sortedAscending }) => {
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

  const onToggle = e => {
    dispatch({ type: TOGGLE_FILTER, payload: { anchor: e.target } });
  };

  const onSort = () => {
    dispatch({ type: SORT_USERS });
  };

  const [theme] = useTheme();
  const style = filtered ? { paddingTop: 9, backgroundColor: theme.theme.palette.primary[100] } : { paddingTop: 9 };

  return (
    <Paper className={classes.root} square={true} elevation={0}>
      <IconButton style={{ paddingTop: 10 }} className={!sortedAscending ? "" : classes.rotated} onClick={onSort}>
        <SortIcon fontSize="small" color="primary" />
      </IconButton>

      {actions.map(item => {
        return (
          <Button key={item.text} color={item.color} onClick={item.action}>
            {item.text}
          </Button>
        );
      })}

      <IconButton style={style} onClick={onToggle}>
        <FilterList fontSize="small" color="primary" />
      </IconButton>
      <Filter />
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    strings: state.strings.actions,
    filtered: state.filter.filtered,
    sortedAscending: state.data.sortAscending
  };
};
Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtered: PropTypes.bool.isRequired,
  sortedAscending: PropTypes.bool.isRequired
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Actions);
