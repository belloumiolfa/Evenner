import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { objectToArray } from "../../../Layout/helpers";
import EventsListAttendes from "./EventsListAttendes";
import { format } from "date-fns";
import avatar from "../../../Images/user.jpg";

export default class EventListItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={event.hostPhotoURL || avatar}
              />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${event.id}`} color="grey">
                  {event.title}
                </Item.Header>
                <Item.Description>
                  {" "}
                  Hosted by
                  <Link to={`/profile/${event.hostUid}`}>
                    {" "}
                    {event.hostedBy}
                  </Link>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="this event has been cancelled "
                  />
                )}
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
              /*Object.values(event.attendees).map((attendee, index) => (
                <EventsListAttendes key={index} attendee={attendee} />
              ))*/
              objectToArray(event.attendees).map((attendee) => (
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
          {/* <Button
            size="large"
            circular
            icon="trash alternate"
            basic
            floated="right"
            onClick={() => deletEvent(event.id)}
          />*/}
        </Segment>
      </Segment.Group>
    );
  }
}
