import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./EventsConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../../Async/asyncActions";

import { fetchSampleData } from "../../../Data/mockApi";
import { toastr } from "react-redux-toastr";

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: { event }
      });
      toastr.success("Success !! ", "Event has been creates !");
    } catch (error) {
      toastr.error("Ooppps", "Something went wrong");
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: { event }
      });
      toastr.success("Success !! ", "Event has been updated !");
    } catch (error) {
      toastr.error("Ooppps", "Something went wrong");
    }
  };
};

export const deleteEvent = eventID => {
  return {
    type: DELETE_EVENT,
    payload: { eventID }
  };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();

      dispatch({
        type: FETCH_EVENTS,
        payload: { events }
      });

      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
