import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

//ignore the page refresh
const rootElement = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
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
