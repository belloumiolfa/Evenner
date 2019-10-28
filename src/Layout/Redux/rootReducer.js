import { combineReducers } from "redux";
import testReducer from "../../Components/testarea/testReducer";
import eventReducer from "../../Components/Events/Redux/eventReducer";

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer
});

export default rootReducer;
