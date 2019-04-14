const editInitialState = {
  open: false,
  user: {},
  isNew: false
};

export const EDIT_USER = "edit-user";
export const EDIT_CANCEL = "edit-cancel";

export default (state = editInitialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      return { open: true, ...action.payload };
    case EDIT_CANCEL:
      return { ...editInitialState };
    default:
      return state;
  }
};
