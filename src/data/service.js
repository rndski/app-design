import axios from "axios";
import uuidv4 from "uuid/v4";

export const AppActions = {
  ADD: "add",
  NEW: "new",
  CLEAR: "clear",
  REMOVE: "remove",
  EDIT: "edit",
  CANCEL: "cancel",
  SAVE: "save",
  LOAD: "load",

  ERROR: "error",
  BUSY: "busy"
};
export const User = () => {
  return {
    email: "",
    gender: "male",
    name: {
      last: "",
      first: ""
    },
    login: {
      uuid: uuidv4()
    }
  };
};
const dispatchWithDelay = (dispatch, type, payload, delay = 300) => {
  setTimeout(() => {
    dispatch({
      type,
      payload
    });
  }, delay);
};

const USER_URL = "https://randomuser.me/api/";

const loadUserData = async count => {
  if (count === undefined) count = 5;
  let url = `${USER_URL}?results=${count}`;
  return await axios.get(url, { headers: { mode: "no-cors" } });
};

const UserService = {
  load: async (dispatch, count) => {
    dispatch({ type: AppActions.BUSY, busy: true });

    try {
      const res = await loadUserData(count || 10);
      const payload = {
        users: res.data.results,
        message: `Loaded ${res.data.results.length} new users...`,
        busy: false
      };
      dispatch({ type: AppActions.ADD, payload });
    } catch (e) {
      const payload = {
        message: `Something went wrong with getting the users... :(`,
        busy: false
      };
      dispatch({ type: AppActions.ERROR, payload });
    }
  },
  save: (dispatch, edit, user) => {
    const messageText = edit.isNew ? "has been created!" : "has been updated!";
    dispatch({
      type: AppActions.SAVE,
      payload: {
        edit: { ...edit, user },
        message: `${user.name.first} ${user.name.last} ${messageText}`
      }
    });
  },
  delete: (dispatch, item) => {
    dispatch({
      type: AppActions.REMOVE,
      payload: {
        users: [item],
        message: `${item.name.first} ${item.name.last} has been deleted...`
      }
    });
  },
  edit: (dispatch, item) => {
    dispatch({
      type: AppActions.EDIT,
      payload: {
        edit: {
          user: item
        }
      }
    });
  },
  new: dispatch => {
    dispatch({ type: AppActions.NEW, payload: {} });
  },
  clear: dispatch => {
    const payload = {
      message: "Users have been cleared..."
    };

    dispatchWithDelay(dispatch, AppActions.CLEAR, payload);
  }
};

export default UserService;
