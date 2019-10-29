import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

//import components
import EventList from "../EventList/EventList";

//import actions
import { createEvent, updateEvent, deleteEvent } from "../Redux/eventActions";

class EventDashboard extends Component {
  //delete an event
  handelDeletEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deletEvent={this.handelDeletEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h1">Activity</Header>
        </Grid.Column>
      </Grid>
    );
  }
}
//connect the state
const mapState = state => ({
  events: state.events
});

//connect actions
const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};

export default connect(
  mapState,
  actions
)(EventDashboard);
