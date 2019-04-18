const filterInitialState = {
  open: false,
  gender: "",
  name: "",
  filtered: 0
};

export const TOGGLE_FILTER = "toggle-filter";
export const APPLY_FILTER = "apply-filter";
export const CLEAR_FILTER = "clear-filter";
export const CLOSE_FILTER = "close-filter";
export const FILTER_COUNT = "filter-count";

export default (state = filterInitialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return { ...state, ...action.payload, open: !state.open };
    case APPLY_FILTER:
      return { ...state, ...action.payload, fitered: true };
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
