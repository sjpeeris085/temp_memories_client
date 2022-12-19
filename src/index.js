import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";

import App from "./App";
import "./index.css";

/*
If you want to use createStore without this visual deprecation warning, use the legacy_createStore import instead:

import { legacy_createStore as createStore} from 'redux'
*/

/*
   *** Cycle of adding new function ***

  1) (SERVER) add new router and implement it in controller.
  2) (CLIENT)
     2.1) add api req in api/index.js.
     2.2) make actions that consume above api request.
     2.3) make reducer that consume above actions.
     2.4) dispatch that action (impl. in action/index.js) within relevent Component
          < ex. dispatch(actionMethod(params...))  >

          OR

         we can use useSelector to get access to redux store
*/

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
