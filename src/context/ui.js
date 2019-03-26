import { createContext } from "react";

export default createContext();

//export default uiContext;

// const uiContextProvider = props => {
//   const [state, dispatch] = useReducer(uiReducer, uiInitialState);
//   return (
//     <div>
//       <uiContext.Provider value={dispatch}>{props.children}</uiContext.Provider>
//     </div>
//   );
// };

// export default uiContextProvider;
