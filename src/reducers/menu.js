const menuInitialState = {
  open: false,
  anchor: {}
};

export const OPEN_MENU = "open-menu";
export const CLOSE_MENU = "close-menu";

const menuReducer = (state = menuInitialState, action) => {
  let newState = state;

  switch (action.type) {
    case OPEN_MENU:
      newState = { open: true, ...action.payload };
      break;
    case CLOSE_MENU:
      newState = { ...menuInitialState };
      break;
    default:
      return state;
  }
  return newState;
};

export default menuReducer;
