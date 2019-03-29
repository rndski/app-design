export const uiInitialState = { busy: false, action: "" };

export const UIActions = {
  BUSY: "busy",
  TOGGLE_BUSY: "toggle-busy",
  ACTION: "action"
};

export const uiReducer = (state, action) => {
  //console.log("UIReducer: ", action.type, action);
  switch (action.type) {
    case UIActions.BUSY:
      return { ...state, busy: action.busy, action: action.action };
    case UIActions.TOGGLE_BUSY:
      return { ...state, busy: !state.busy };
    case UIActions.ACTION:
      return { ...state, action: action.action };
    default:
      return state;
  }
};

export default uiReducer;
