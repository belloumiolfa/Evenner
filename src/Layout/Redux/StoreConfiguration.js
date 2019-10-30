import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

export const storeConfiguration = () => {
  //set up devTools extension
  const devTools =
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : null;

  const middlewares = [thunk];

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middlewares),
      devTools
    )
  );

  return store;
};
