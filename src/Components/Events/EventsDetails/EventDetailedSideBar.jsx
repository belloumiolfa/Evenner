import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Label } from "semantic-ui-react";

const EventDetailedSideBar = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="grey"
      >
        {attendees && attendees.length}
        {attendees && attendees.length === 1 ? "Person" : " People"} Going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees &&
            attendees.map((attendee) => (
              <Item key={attendee.id} style={{ position: "relative" }}>
                {attendee.host && (
                  <Label
                    style={{ position: "absolute" }}
                    color="grey"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link
                      to={`/profile/${attendee.id}`}
                      style={{ color: "grey" }}
                    >
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export default EventDetailedSideBar;
