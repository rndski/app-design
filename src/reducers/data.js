const dataInitialState = {
  users: [],
  sortAscending: true
};

export const ADD_USERS = "add-users";
export const DELETE_USER = "delete-user";
export const CLEAR_USERS = "clear-users";
export const UPDATE_USER = "update-user";
export const SORT_USERS = "sort-users";

const sortUsers = (users, ascending) =>
  ascending
    ? users.sort((a, b) => a.name.last.localeCompare(b.name.last))
    : users.sort((a, b) => b.name.last.localeCompare(a.name.last));

export default (state = dataInitialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      const sorted = sortUsers([...state.users, ...action.payload.users], state.sortAscending);
      return { ...state, users: sorted };
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
    case SORT_USERS:
      const u = sortUsers(state.users, !state.sortAscending);
      return { ...state, users: [...u], sortAscending: !state.sortAscending };
    default:
      return state;
  }
};
