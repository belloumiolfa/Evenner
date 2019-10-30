import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

//import components
import EventsListAttendes from "./EventsListAttendes";
import { format, parseISO } from "date-fns/esm";

export default class EventListItem extends Component {
  render() {
    const { event, deletEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header color="grey">{event.title}</Item.Header>
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon color="grey" name="clock" />
            {format(parseISO(event.date), "EEEE do LLL")} at{" "}
            {format(parseISO(event.date), "h:mm a")} |{" "}
            <Icon color="grey" name="marker" />
            {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              event.attendees.map(attendee => (
                <EventsListAttendes key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            size="large"
            circular
            icon="eye"
            basic
            floated="right"
            as={Link}
            to={`/events/${event.id}`}
          />
          <Button
            size="large"
            circular
            icon="trash alternate"
            basic
            floated="right"
            onClick={() => deletEvent(event.id)}
          />
        </Segment>
      </Segment.Group>
    );
  }
}
