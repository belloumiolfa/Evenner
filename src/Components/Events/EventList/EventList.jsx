import React, { Component, Fragment } from "react";

//import components
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    const { events, deletEvent } = this.props;

    return (
      <Fragment>
        {events &&
          events.map((event) => (
            <EventListItem
              key={event.id}
              event={event}
              deletEvent={deletEvent}
            />
          ))}
      </Fragment>
    );
  }
}
