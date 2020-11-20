import React, { Component, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
//import components
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    const {
      events,
      deletEvent,
      getNextEvent,
      loading,
      moreEvents,
    } = this.props;

    return (
      <Fragment>
        {events && events.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvent}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events &&
              events.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  deletEvent={deletEvent}
                />
              ))}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}
