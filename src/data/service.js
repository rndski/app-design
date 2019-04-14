import axios from "axios";
import uuidv4 from "uuid/v4";

import { EDIT_USER, EDIT_CANCEL } from "../reducers/edit";
import {
  ADD_USERS,
  DELETE_USER,
  CLEAR_USERS,
  UPDATE_USER
} from "../reducers/data";
import { BUSY, ERROR, MESSAGE } from "../reducers/app";

export const User = () => {
  return {
    gender: "",
    name: { title: "", first: "", last: "" },
    location: {
      street: "",
      city: "",
      state: "",
      postcode: ""
    },
    email: "",
    login: {
      uuid: uuidv4()
    },
    dob: { date: "", age: 0 },
    picture: {
      large: "",
      medium: "",
      thumbnail: ""
    }
  };
};
const dispatchWithDelay = (dispatch, type, payload = {}, delay = 300) => {
  setTimeout(() => {
    dispatch({
      type,
      payload
    });
  }, delay);
};

const USER_URL = "https://randomuser.me/api/";
const EXCLUSIONS = "&exc=registered,phone,cell,nat,id";

const loadUserData = async count => {
  if (count === undefined) count = 5;
  let url = `${USER_URL}?results=${count}${EXCLUSIONS}`;
  return await axios.get(url, { headers: { mode: "no-cors" } });
};

const UserService = {
  load: async (dispatch, count) => {
    dispatch({ type: BUSY, payload: { busy: true } });

    try {
      const res = await loadUserData(count || 10);
      const payload = {
        users: res.data.results
      };
      dispatch({ type: ADD_USERS, payload });
      dispatch({
        type: BUSY,
        payload: {
          busy: false,
          message: `Loaded ${res.data.results.length} users!`
        }
      });
    } catch (e) {
      const payload = {
        message: `Something went wrong with getting the users... :(`,
        busy: false
      };
      dispatch({ type: ERROR, payload });
    }
  },
  save: (dispatch, edit, user) => {
    const messageText = edit.isNew ? "has been created!" : "has been updated!";

    if (edit.isNew) dispatch({ type: ADD_USERS, payload: { users: [user] } });
    else dispatch({ type: UPDATE_USER, payload: { user } });
    dispatch({ type: EDIT_CANCEL });
    dispatch({
      type: MESSAGE,
      payload: {
        message: `${user.name.first} ${user.name.last} ${messageText}`
      }
    });
  },
  delete: (dispatch, item) => {
    dispatch({
      type: DELETE_USER,
      payload: {
        users: [
          item
        ] /*,
        message: `${item.name.first} ${item.name.last} has been deleted...`*/
      }
    });
  },
  edit: (dispatch, item) => {
    dispatch({
      type: EDIT_USER,
      payload: {
        user: item
      }
    });
  },
  new: dispatch => {
    dispatch({ type: EDIT_USER, payload: { user: new User(), isNew: true } });
  },
  clear: dispatch => {
    dispatchWithDelay(dispatch, CLEAR_USERS);
  }
};

Object.freeze(UserService);

export default UserService;
