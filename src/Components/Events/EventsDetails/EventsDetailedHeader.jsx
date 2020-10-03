import React from "react";

import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

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

const EventsDetailedHeader = ({ event, category }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={require(`../../../Images/culture.jpg`)}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content="ddd" style={{ color: "white" }} />
                <p>zzzzz</p>

                <p>
                  Hosted by <strong>zzzzz</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button circular color="grey">
          Join
        </Button>

        <Button circular basic>
          Cancel
        </Button>

        <Button
          circular
          color="grey"
          floated="right"
          as={Link}
          to={`/manage/ghfdtyh`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default EventsDetailedHeader;
