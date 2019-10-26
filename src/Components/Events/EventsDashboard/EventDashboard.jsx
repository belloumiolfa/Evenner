import React, { Component } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";

//constants
import { events } from "../../../Constants/EventOptions";

export default class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false
  };
  handleIsOpenToggele = e => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };
  render() {
    const { events, isOpen } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            color="blue"
            content="Create event"
            onClick={this.handleIsOpenToggele}
          />
          {isOpen && <EventForm cancelFormOpen={this.handleIsOpenToggele} />}
        </Grid.Column>
      </Grid>
    );
  }
}
