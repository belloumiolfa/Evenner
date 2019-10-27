import React from "react";
import { Segment, Container, Header, Button, Icon } from "semantic-ui-react";

const HomePge = ({ history }) => {
  return (
    <Segment textAlign="center" vertical>
      <Container text>
        <Header as="h1">Evenner</Header>
        <Button size="huge" circular onClick={() => history.push("/events")}>
          Get started
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePge;
