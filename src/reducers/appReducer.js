import { AppActions, User } from "../data/service";

export const appInitialState = {
  users: [],
  busy: false,
  message: "",
  messageKey: 0,
  theme: null,

  edit: {
    user: {},
    open: false,
    isNew: false
  }
};

export const appReducer = (state, action) => {
  //console.log(`Reduce[${action.type}]`);

  switch (action.type) {
    case AppActions.NEW:
      return { ...state, edit: { user: new User(), open: true, isNew: true } };
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
        ...action.payload,
        users: []
      };
    case AppActions.REMOVE:
      return remove(state, action);
    case AppActions.EDIT:
      return edit(state, action);
    case AppActions.SAVE:
      return save(state, action);
    case AppActions.CANCEL:
      return { ...state, edit: { open: false } };
    case AppActions.BUSY:
      return { ...state, busy: action.busy };
    case AppActions.ERROR:
      return { ...state, ...action.payload, messageKey: state.messageKey + 1 };
    default:
      return state;
  }
};

const remove = (state, action) => {
  let uuids = [];
  for (let user of action.payload.users) uuids.push(user.login.uuid);

  let users = state.users.filter(user => {
    return !uuids.includes(user.login.uuid);
  });
  let s = { ...state, ...action.payload, users };
  return s;
};
const edit = (state, action) => {
  return {
    ...state,
    edit: {
      user: { ...action.payload.edit.user },
      isNew: false,
      open: true
    }
  };
};
const save = (state, action) => {
  if (action.payload.edit.isNew) {
    return {
      ...state,
      ...action.payload,
      messageKey: state.messageKey + 1,
      users: [...state.users, action.payload.edit.user],
      edit: { ...action.payload.edit, open: false }
    };
  } else {
    let updated = action.payload.edit.user;
    const newUsers = state.users.map(obj =>
      updated.login.uuid === obj.login.uuid ? updated : obj
    );
    return {
      ...state,
      ...action.payload,
      messageKey: state.messageKey + 1,
      users: [...newUsers],
      edit: { ...action.payload.edit, open: false }
    };
  }
};

export default appReducer;
