import businesses from "./businesses";
import carts from "./carts";
import { configureStore } from "@reduxjs/toolkit";
import items from "./items";
import session from "./session";
import userBusinesses from "./userBusinesses";

// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

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

export default configureStore({
  reducer: {
    session,
    businesses,
    userBusinesses,
    items,
    carts,
  },
});
