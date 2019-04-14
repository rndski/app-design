const popupInitialState = {
  open: false,
  image: "",
  anchor: {}
};

export const OPEN_PROFILE_PIC = "open-profile-pic";
export const CLOSE_PROFILE_PIC = "close-profile-pic";

export default (state = popupInitialState, action) => {
  switch (action.type) {
    case OPEN_PROFILE_PIC:
      return { ...state, open: true, ...action.payload };
    case CLOSE_PROFILE_PIC:
      return { ...state, open: false, image: "", anchor: {} };
    default:
      return state;
  }
};
