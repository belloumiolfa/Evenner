import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

//import reducers
import testReducer from "../../Components/testarea/testReducer";
import eventReducer from "../../Components/Events/Redux/eventReducer";
import modalReducer from "../../Components/Modals/modalReducer";
import authReducer from "../../Components/Authentification/authReducer";
import asyncReducer from "../../Components/Async/asyncReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer
});

export default rootReducer;
