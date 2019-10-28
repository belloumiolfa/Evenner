import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventsDetailedHeader from "./EventsDetailedHeader";
import EventsDetailedInfo from "./EventsDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";

const EventDetailsPage = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventsDetailedHeader event={event} />
        <EventsDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

const mapState = (state, ownProps) => {
  const eventID = ownProps.match.params.id;

  let event = {};

  if (eventID && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventID)[0];
  }
  return { event };
};

export default connect(mapState)(EventDetailsPage);
