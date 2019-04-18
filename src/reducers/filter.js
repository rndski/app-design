const filterInitialState = {
  open: false,
  filtered: false,
  gender: "",
  name: ""
};

export const TOGGLE_FILTER = "toggle-filter";
export const APPLY_FILTER = "apply-filter";
export const CLEAR_FILTER = "clear-filter";
export const CLOSE_FILTER = "close-filter";
export const FILTER_COUNT = "filter-count";

const isFiltered = filter => filter.gender.length > 0 || filter.name.length > 0;

export default (state = filterInitialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return { ...state, ...action.payload, open: !state.open };
    case APPLY_FILTER:
      return { ...state, ...action.payload, filtered: isFiltered(action.payload) };
    case CLEAR_FILTER:
      return { ...filterInitialState, open: true };
    case CLOSE_FILTER:
      return { ...state, open: false };
    case FILTER_COUNT:
      return { ...state, filtered: action.payload };
    default:
      return state;
  }
};
