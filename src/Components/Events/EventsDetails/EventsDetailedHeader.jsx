import React from "react";

import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Fragment } from "react";
import Loading from "../../../Layout/Loading";

const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const EventsDetailedHeader = ({
  event,
  isHost,
  category,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={
            event.category ? (
              require(`../../../Images/${event.category}.jpg`)
            ) : (
              <Loading />
            )
          }
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content="ddd" style={{ color: "white" }} />
                <p>
                  {event.date && format(event.date.toDate(), "EEEE do LLL")}
                </p>
                <p>
                  Hosted by
                  <strong>
                    <Link
                      to={`/profile/${event.hostUid}`}
                      style={{ color: "white" }}
                    >
                      {event.hostedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && (
          <Fragment>
            {isGoing ? (
              <Button circular basic onClick={() => cancelGoingToEvent(event)}>
                Cancel my place
              </Button>
            ) : (
              <Button onClick={() => goingToEvent(event)} circular color="grey">
                Join this event
              </Button>
            )}
          </Fragment>
        )}
        {isHost && (
          <Button
            circular
            color="grey"
            floated="right"
            as={Link}
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventsDetailedHeader;
