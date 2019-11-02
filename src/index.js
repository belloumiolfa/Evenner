import React from "react";
import ReactDOM from "react-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import "./index.css";
import App from "./Layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";

import { Provider } from "react-redux";
import { storeConfiguration } from "./Layout/Redux/StoreConfiguration";

import ScrollToTop from "./ScrollToTop";
//import { loadEvents } from "./Components/Events/Redux/eventActions";

//import firebase configuration

import firebase from "./Config/firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore

//ignore the page refresh
const rootElement = document.getElementById("root");

//the store
const store = storeConfiguration();

//fetsh data events
//store.dispatch(loadEvents());

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

let render = () => {
  ReactDOM.render(
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <ReduxToastr
              position="bottom-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
            />
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </ReactReduxFirebaseProvider>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept("./Layout/App", () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
