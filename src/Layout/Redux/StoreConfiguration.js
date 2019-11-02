import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const storeConfiguration = () => {
  const middlewares = [thunk];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

//set up devTools extension

/*   const devTools =
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : null;
 */
