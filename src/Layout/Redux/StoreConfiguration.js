import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
/**
 * Import firebase config
 */
import "firebase/app";
import { getFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import firebase from "../../Config/firebase";

export const storeConfiguration = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
