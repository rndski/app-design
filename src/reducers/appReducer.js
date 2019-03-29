export const appInitialState = {
  users: [],
  busy: false,
  message: "",
  messageKey: 0,
  theme: null
};

export const AppActions = {
  ADD: "add",
  CLEAR: "clear",
  DELETE: "delete",

  ERROR: "error",
  BUSY: "busy"
};

export const appReducer = (state, action) => {
  console.log(`Reduce[${action.type}]`);

  switch (action.type) {
    case AppActions.ADD:
      return {
        ...state,
        ...action.payload,
        users: [...state.users, ...action.payload.users],
        messageKey: state.messageKey + 1
      };
    case AppActions.CLEAR:
      return {
        ...state,
        ...action.payload
      };
    case AppActions.DELETE:
      let uuids = [];
      for (let user of action.payload.users) uuids.push(user.login.uuid);

      let users = state.users.filter(user => {
        return !uuids.includes(user.login.uuid);
      });
      let s = { ...state, ...action.payload, users };
      return s;

    case AppActions.BUSY:
      return { ...state, busy: action.busy };
    default:
      return state;

    case AppActions.ERROR:
      return { ...state, ...action.payload, messageKey: state.messageKey + 1 };
  }
};

export default appReducer;
