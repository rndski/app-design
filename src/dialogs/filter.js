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
import InputAdornment from "@material-ui/core/InputAdornment";
import Clear from "@material-ui/icons/Clear";

import { APPLY_FILTER, CLOSE_FILTER } from "../reducers/filter";
import { Radio } from "@material-ui/core";

const styles = {
  formControl: {
    minWidth: 250,
    padding: 15
  },
  radio: {
    display: "block"
  },
  actions: {
    marginTop: 5,
    display: "flex",
    justifyContent: "flex-end"
  }
};

const Filter = ({ classes, filter, dispatch, strings, isFiltered }) => {
  const onChange = e => {
    const value = e.target.name === "name" ? e.target.value : e.target.checked ? e.target.value : "";

    dispatch({
      type: APPLY_FILTER,
      payload: { ...filter, [e.target.name]: value }
    });
  };

  const onClear = e => {
    dispatch({
      type: APPLY_FILTER,
      payload: { ...filter, name: "" }
    });
  };

  const onClose = () => {
    dispatch({ type: CLOSE_FILTER });
  };

  return (
    <Popover open={filter.open} anchorEl={filter.anchor} onClose={onClose}>
      <FormControl component="fieldset" className={classes.formControl}>
        <TextField
          name="name"
          type="text"
          fullWidth
          autoFocus
          value={filter.name}
          placeholder={strings.namePlaceholder}
          onChange={onChange}
          // inputProps={{ enableviewstate: "false" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Clear onClick={onClear} style={{ cursor: "pointer", opacity: isFiltered ? 1 : 0.4 }} />
              </InputAdornment>
            )
          }}
        />
        <RadioGroup name="gender" value={filter.gender} onChange={onChange} className={classes.radio}>
          <FormControlLabel value="" control={<Radio />} label={strings.all} />
          <FormControlLabel value="female" control={<Radio />} label={strings.female} />
          <FormControlLabel value="male" control={<Radio />} label={strings.male} />
        </RadioGroup>
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
    strings: { ...state.strings.filter, ...state.strings.global },
    isFiltered: state.filter.name.length > 0
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Filter);
