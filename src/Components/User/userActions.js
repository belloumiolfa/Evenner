import { toastr } from "react-redux-toastr";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../Async/asyncActions";
import firebase from "../../Config/firebase";
import { FETCH_EVENTS } from "../Events/Redux/EventsConstants";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  // add user attributes without isLoaded, isEmpty
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await getFirebase().updateProfile(updatedUser);
    toastr.success("Success", " Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());

  const firestore = firebase.firestore();
  const today = new Date();

  let eventsRef = firestore.collection("event_attendee");
  let query;

  switch (activeTab) {
    case 1: //past events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: //future events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: //hosted events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
      break;
  }

  try {
    let querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      const evt = await firestore
        .collection("events")
        .doc(querySnap.docs[i].data().eventId)
        .get();
      events.push({ ...evt.data(), id: evt.id });

      dispatch({ type: FETCH_EVENTS, payload: { events } });
    }

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
