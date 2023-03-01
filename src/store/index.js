import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import dashboard from "./dashboard/reducer";

const middlewares = [reduxThunk];

const appReducer = combineReducers({ dashboard });
const rootReducer = (stateData, action) => {
  let state = stateData;
  return appReducer(state, action);
};

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

export default configureStore();

// we can use both either uper and down one

// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import dashboard from "./dashboard/reducer";
// import { combineReducers } from "redux";

// const rootReducer = combineReducers({
//   dashboard,
// });

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
