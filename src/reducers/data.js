const dataInitialState = {
  users: []
};

export const ADD_USERS = "add-users";
export const DELETE_USER = "delete-user";
export const CLEAR_USERS = "clear-users";
export const UPDATE_USER = "update-user";

export default (state = dataInitialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, users: [...state.users, ...action.payload.users] };
    case UPDATE_USER:
      let updated = action.payload.user;
      const newUsers = state.users.map(obj => (updated.login.uuid === obj.login.uuid ? updated : obj));
      return { ...state, users: newUsers };
    case DELETE_USER:
      let uuids = [];
      for (let user of action.payload.users) uuids.push(user.login.uuid);

      let users = state.users.filter(user => {
        return !uuids.includes(user.login.uuid);
      });
      return { ...state, ...action.payload, users };
    case CLEAR_USERS:
      return { ...dataInitialState };
    default:
      return state;
  }
};
