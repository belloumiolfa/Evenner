import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    const { events, selectedEvent, deletEvent } = this.props;
    return (
      <Fragment>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            selectedEvent={selectedEvent}
            deletEvent={deletEvent}
          />
        ))}
      </Fragment>
    );
  }
}
