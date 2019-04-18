import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { APPLY_FILTER, CLEAR_FILTER, CLOSE_FILTER } from "../reducers/filter";
import { Checkbox } from "@material-ui/core";

const styles = {
  formControl: {
    minWidth: 250,
    padding: "0 10px 10px 10px"
  },
  radio: {
    display: "block"
  },
  actions: {
    marginTop: 10,
    display: "flex",
    justifyContent: "flex-end"
  }
};

const Filter = ({ classes, filter, dispatch, strings }) => {
  const onChange = e => {
    const value = e.target.name === "name" ? e.target.value : e.target.checked ? e.target.value : "";

    dispatch({
      type: APPLY_FILTER,
      payload: { ...filter, [e.target.name]: value }
    });
  };

  const onClear = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const onClose = () => {
    dispatch({ type: CLOSE_FILTER });
  };

  return (
    <Popover open={filter.open} anchorEl={filter.anchor} onClose={onClose}>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup name="gender" value={filter.gender} onChange={onChange} className={classes.radio}>
          <FormControlLabel value="female" control={<Checkbox />} label={strings.female} />
          <FormControlLabel value="male" control={<Checkbox />} label={strings.male} />
        </RadioGroup>
        <TextField
          name="name"
          type="text"
          fullWidth
          autoFocus
          value={filter.name}
          placeholder={strings.namePlaceholder}
          onChange={onChange}
          inputProps={{ enableviewstate: "false" }}
        />
        <div className={classes.actions}>
          <Button onClick={onClear} color="secondary">
            {strings.clear}
          </Button>
        </div>
      </FormControl>
    </Popover>
  );
};

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    filter: state.filter,
    strings: { ...state.strings.filter, ...state.strings.global }
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Filter);
