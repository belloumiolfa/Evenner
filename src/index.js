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
import { loadEvents } from "./Components/Events/Redux/eventActions";

//ignore the page refresh
const rootElement = document.getElementById("root");
//the store
const store = storeConfiguration();

store.dispatch(loadEvents());

let render = () => {
  ReactDOM.render(
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
    </Provider>,
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
