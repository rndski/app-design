export const dInitialState = { users: [], loaded: false, busy: false };

export const DataActions = {
  ADD: "add",
  CLEAR: "clear",
  DELETE: "delete"
};

export const uiReducer = (state, action) => {
  console.log("DataReducer: ", action.type, action);
  switch (action.type) {
    case DataActions.ADD:
      return { users: [...state.users, ...action.payload] };
    case DataActions.CLEAR:
      if (state.users.length === 0) return state;
      return { users: [], loaded: false };
    case DataActions.DELETE:
      let users = state.users.filter(user => {
        return user.login.uuid !== action.uuid;
      });
      return { users };
    default:
      return state;
  }
};

export default uiReducer;
