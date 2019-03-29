export const appInitialState = {
  users: [],
  busy: false,
  message: ""
};

export const AppActions = {
  ADD: "add",
  CLEAR: "clear",
  DELETE: "delete",

  BUSY: "busy"
};

export const appReducer = (state, action) => {
  //console.log("DataReducer: ", action.type, action);
  switch (action.type) {
    case AppActions.ADD:
      return {
        ...state,
        ...action.payload,
        users: [...state.users, ...action.payload.users]
      };
    case AppActions.CLEAR:
      return {
        ...state,
        ...action.payload
      };
    case AppActions.DELETE:
      let users = state.users.filter(user => {
        return user.login.uuid !== action.payload.uuid;
      });
      let s = { ...state, ...action.payload, users };
      delete s.uuid;
      return s;

    case AppActions.BUSY:
      return { ...state, busy: action.busy };
    default:
      return state;
  }
};

export default appReducer;
