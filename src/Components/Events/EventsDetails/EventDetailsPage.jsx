import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

//import components
import EventsDetailedHeader from "./EventsDetailedHeader";
import EventsDetailedInfo from "./EventsDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { withFirestore, firestoreConnect } from "react-redux-firebase";
import { Component } from "react";

const mapState = (state, ownProps) => {
  const eventID = ownProps.match.params.id;

  var event = {};

  if (eventID && state.events.length > 0) {
    event = state.firestore.ordered.events.filter(
      (event) => event.id === eventID
    )[0];
  }

  return { event };
};

class EventDetailsPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    console.log(event);
  }
  render() {
    const { event } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventsDetailedHeader category={event.category} />
          <EventsDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSideBar attendees={event.attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState)(firestoreConnect()(EventDetailsPage));
