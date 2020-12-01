import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

//import components
import EventsDetailedHeader from "./EventsDetailedHeader";
import EventsDetailedInfo from "./EventsDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { firebaseConnect, isEmpty, withFirestore } from "react-redux-firebase";
import { objectToArray, createDataTree } from "../../../Layout/helpers";
import {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
} from "../Redux/eventActions";
import { compose } from "redux";

const mapState = (state, ownProps) => {
  const eventID = ownProps.match.params.id;

  var event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(
        (event) => event.id === eventID
      )[0] || {};
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
};

class EventDetailsPage extends Component {
  async componentDidMount() {
    /*
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push("/events");
      toastr.error("Sorry !!", "Event not found");
    }*/
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }
  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat,
    } = this.props;

    const attendees =
      event && event.attendees && objectToArray(event.attendees);

    //user loged in is he hoted the event or he will join the event
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventsDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventsDetailedInfo event={event} />
          <EventDetailedChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSideBar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect((props) => [`event_chat/${props.match.params.id}`])
)(EventDetailsPage);
