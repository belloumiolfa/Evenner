import { combineReducers } from "redux";
import testReducer from "../../Components/testarea/testReducer";
import eventReducer from "../../Components/Events/Redux/eventReducer";
import { reducer as FormReducer } from "redux-form";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer
});

export default rootReducer;
