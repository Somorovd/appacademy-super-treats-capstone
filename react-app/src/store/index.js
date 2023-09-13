// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import session from "./session";
import businesses from "./businesses";
// import userBusinesses from "./userBusinesses";
// import items from "./items";
import carts from "./carts";

// const CLEAR_ALL = "app/CLEAR_ALL";

// export const clearAll = () => ({
//   type: CLEAR_ALL,
//   payload: null,
// });

// const appReducer = combineReducers({
//   session,
//   businesses,
//   userBusinesses,
//   items,
//   carts,
// });

// const rootReducer = (state, action) => {
//   if (action.type === CLEAR_ALL) {
//     return appReducer(undefined, action);
//   } else return appReducer(state, action);
// };

// let enhancer;

// if (process.env.NODE_ENV === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require("redux-logger").default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    session,
    businesses,
    carts,
  },
});
