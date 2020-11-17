import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

//import components
import EventList from "../EventList/EventList";

//import actions
import { createEvent, updateEvent, deleteEvent } from "../Redux/eventActions";
import Loading from "../../../Layout/Loading";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

class EventDashboard extends Component {
  //delete an event
  handelDeletEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;
    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <Grid>
          <Grid.Column width={10}>
            <EventList events={events} deletEvent={this.handelDeletEvent} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h1">
              <EventActivity />
            </Header>
          </Grid.Column>
        </Grid>
      );
    }
  }
}
//connect the state
const mapState = (state) => ({
  events: state.firestore.ordered.events,
  //loading: state.async.loading,
});

//connect actions
const actions = {
  createEvent,
  deleteEvent,
  updateEvent,
};

export default connect(
  mapState,
  actions
)(firestoreConnect(["events"])(EventDashboard));
