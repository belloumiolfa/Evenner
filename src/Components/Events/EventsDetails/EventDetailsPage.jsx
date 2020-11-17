import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

//import components
import EventsDetailedHeader from "./EventsDetailedHeader";
import EventsDetailedInfo from "./EventsDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { firestoreConnect } from "react-redux-firebase";
import { objectToArray } from "../../../Layout/helpers";
import { goingToEvent, cancelGoingToEvent } from "../Redux/eventActions";

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

  return { event, auth: state.firebase.auth };
};
const actions = {
  goingToEvent,
  cancelGoingToEvent,
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
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;

    const attendees =
      event && event.attendees && objectToArray(event.attendees);

    //user loged in is he hoted the event or he will join the event
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventsDetailedHeader
            event={event}
            category={event.category}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventsDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSideBar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect()(EventDetailsPage));
