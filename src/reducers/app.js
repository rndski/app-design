const appInitialState = {
  busy: false,
  message: ""
};
export const BUSY = "busy";
export const ERROR = "error";
export const MESSAGE = "message";

export default (state = appInitialState, action) => {
  switch (action.type) {
    case BUSY:
      return { ...action.payload };
    case ERROR:
      return { ...state, ...action.payload };
    case MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
