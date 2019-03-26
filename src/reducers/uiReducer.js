export const BUSY = "busy";
export const TOGGLE_BUSY = "toggle-busy";
export const uiInitialState = { busy: false };

export const uiReducer = (state, action) => {
  console.log("UIReducer: ", action.type, action);
  switch (action.type) {
    // case BUSY:
    //   let newState = { ...state, busy: action.busy };
    //   console.log("UIReducer: ", newState);
    //   return newState;
    case TOGGLE_BUSY:
      return { ...state, busy: !state.busy };
    default:
      return state;
  }
};

export default uiReducer;
