import { DELETE_EVENT, FETCH_EVENTS } from "./EventsConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from "../../Async/asyncActions";

import { fetchSampleData } from "../../../Data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../../Layout/helpers";

export const createEvent = (event) => {
  // async return promise
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;

    const newEvent = createNewEvent(user, photoURL, event);
    try {
      /*dispatch({
        type: CREATE_EVENT,
        payload: { event },
      });*/

      // add the event to the firestore
      let createdEvent = await firestore.add("events", newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      });
      toastr.success("Success !! ", "Event has been creates !");
      return createdEvent;
    } catch (error) {
      toastr.error("Ooppps", "Something went wrong");
    }
  };
};

export const updateEvent = (event) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      /*
      dispatch({
        type: UPDATE_EVENT,
        payload: { event },
      });*/
      await firestore.update(`events/${event.id}`, event);

      toastr.success("Success !! ", "Event has been updated !");
    } catch (error) {
      console.log(error);
      toastr.error("Ooppps", "Something went wrong");
    }
  };
};

export const cancelToggele = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event ?"
    : "This will activate the event are you sure ?";
  try {
    toastr.confirm(message, {
      onOk: async () => {
        await firestore.update(`events/${eventId}`, { cancelled: cancelled });
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (eventID) => {
  return {
    type: DELETE_EVENT,
    payload: { eventID },
  };
};

export const loadEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();

      dispatch({
        type: FETCH_EVENTS,
        payload: { events },
      });

      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const goingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;

  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/static/media/user.0f8e789e.jpg",
    displayName: profile.displayName,
    host: false,
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee,
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    });

    toastr.success("Success", "You have signed up to this event ");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem signing up to this event");
  }
};
export const cancelGoingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });

    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

    toastr.success("Success", "You have removed yourself from this event ");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};
