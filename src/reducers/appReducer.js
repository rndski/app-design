import { AppActions, User } from "../data/service";
import { combineReducers, createStore } from "redux";

export const appInitialState = {
  users: [],
  busy: false,
  message: "",
  messageKey: 0,

  edit: {
    user: {},
    open: false,
    isNew: false
  },

  menu: {
    open: false,
    anchor: null
  },

  popover: {
    open: false,
    image: "",
    anchor: {}
  }
};

const appXInitialState = {
  busy: false,
  message: "",
  messageKey: 0
};

const popoverInitialState = {
  open: false,
  anchor: {},
  image: ""
};

// const menuInitialState = {
//   open: false
// };

const appXReducer = (state = appXInitialState, action) => {
  switch (action.type) {
    case AppActions.BUSY:
      return { busy: !state.busy };
    default:
      return state;
  }
};

export const OPEN_MENU = "open-menu";
export const CLOSE_MENU = "close-menu";

// const menuReducer = (state = menuInitialState, action) => {
//   console.log("menuReducer...", state, action);
//   let newState = state;

//   switch (action.type) {
//     case OPEN_MENU:
//       newState = { open: true, ...action.payload };
//       break;
//     case CLOSE_MENU:
//       newState = { open: false };
//       break;
//     default:
//       return state;
//   }

//   console.log("menu", newState);
//   return newState;
// };

const popoverReducer = (state = popoverInitialState, action) => {
  console.log("popoverReducer...", state, action);
  return state;
};

// const rootReducer = combineReducers({
//   app: appXReducer,
//   menu: menuReducer,
//   popover: popoverReducer
// });

// export const AppStore = createStore(rootReducer);

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
    case AppActions.MENU:
      return { ...state, menu: { ...action.payload } };
    case AppActions.POPOVER:
      return popover(state, action);
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

const popover = (state, action) => {
  let open = !state.popover.open;
  return {
    ...state,
    popover: {
      image: action.payload ? action.payload.image : "",
      open: open,
      anchor: action.payload ? action.payload.anchor : {}
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
