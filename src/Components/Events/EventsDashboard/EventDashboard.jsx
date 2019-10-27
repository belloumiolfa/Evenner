import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";
import avartar from "../../../Images/profile1.jpg";

//constants
const eventsOptions = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

export default class EventDashboard extends Component {
  state = {
    events: eventsOptions,
    isOpen: false,
    selectedEvent: null
  };

  //delete an event
  handelDeletEvent = id => {
    this.setState(({ events }) => ({
      events: events.filter(e => e.id !== id)
    }));
  };

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
  };

  //select an event
  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

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
  };

  /* handleIsOpenToggele = e => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };*/

  //open the create form
  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  //close the create form
  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectedEvent={this.handleSelectEvent}
            deletEvent={this.handelDeletEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            basic
            icon="add"
            size="huge"
            onClick={this.handleCreateFormOpen}
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
