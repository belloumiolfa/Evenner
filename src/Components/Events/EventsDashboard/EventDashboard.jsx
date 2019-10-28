import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { connect } from "react-redux";
import { createEvent, updateEvent, deleteEvent } from "../Redux/eventActions";

class EventDashboard extends Component {
  /*state = {
    isOpen: false,
    selectedEvent: null
  };*/

  //delete an event
  handelDeletEvent = id => {
    /*this.setState(({ events }) => ({
      events: events.filter(e => e.id !== id)
    }));*/

    //delete event with redux
    this.props.deleteEvent(id);
  };
  /*
  //update the event
  handleUpdateEvent = updatedEvent => {
      this.setState(({ events }) => ({
      events: events.map(event => {
        //if we have the same id we return the updeted event
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        }
        //else we return the existed event
        else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
     

    //update event with redux
    this.props.updateEvent(updatedEvent);

    //the create button control
     this.setState(({ events }) => ({
      isOpen: false,
      selectedEvent: null
    }));
  };
*/
  //select an event
  /*handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };
*/
  /*
  //create a new event
  handleCreateEvent = newEvent => {
    //create the new event
    newEvent.id = cuid();
    newEvent.hostPhotoURL = avartar;

    // add the new event in the state
      this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false
    }));
     

    //create new event with redux
    this.props.createEvent(newEvent);

    //the create button control
    this.setState(({ events }) => ({
      isOpen: false
    }));
  };
*/
  /* handleIsOpenToggele = e => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };*/

  //open the create form
  /*handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };*/

  //close the create form
  /*handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };*/

  render() {
    // const { isOpen, selectedEvent } = this.state;
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
