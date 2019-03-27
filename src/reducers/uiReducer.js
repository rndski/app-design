export const uiInitialState = { busy: false };

export const UIActions = {
  BUSY: "busy",
  TOGGLE_BUSY: "toggle-busy"
};

export const uiReducer = (state, action) => {
  console.log("UIReducer: ", action.type, action);
  switch (action.type) {
    case UIActions.BUSY:
      return { ...state, busy: action.busy };
    case UIActions.TOGGLE_BUSY:
      return { ...state, busy: !state.busy };
    default:
      return state;
  }
};

export default uiReducer;
