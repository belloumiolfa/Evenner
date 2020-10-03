import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

//import components
import EventsListAttendes from "./EventsListAttendes";
import { format } from "date-fns";

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
            {event.date && (
              <span>
                {/** it's a timestump we should converted to date */}
                {format(event.date.toDate(), "EEEE do LLL")} at{" "}
                {format(event.date.toDate(), "h:mm a")}
              </span>
            )}
            <Icon color="grey" name="marker" />
            {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              //we receive an object from firestore we should conver it to ana array
              Object.values(event.attendees).map((attendee, index) => (
                <EventsListAttendes key={index} attendee={attendee} />
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
