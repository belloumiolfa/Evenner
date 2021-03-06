import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import EventDetailedMap from "./EventDetailedMap";
import { format } from "date-fns";

const EventsDetailedInfo = ({ event }) => {
  //react hooks to use state in a statless function
  const [isMapOpen, showMapToggele] = useState(false);

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="grey" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="grey" />
          </Grid.Column>
          <Grid.Column width={15}>
            {event.date && (
              <span>
                {format(event.date.toDate(), "EEEE do LLL")} at{" "}
                {format(event.date.toDate(), "h:mm a")}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="grey" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              circular
              basic
              icon="map"
              color="grey"
              size="tiny"
              content={isMapOpen ? "Hide Map" : "Show Map"}
              onClick={() => showMapToggele(!isMapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <EventDetailedMap
          lat={event.venueLatLng.lat}
          lng={event.venueLatLng.lng}
        />
      )}
    </Segment.Group>
  );
};

export default EventsDetailedInfo;
