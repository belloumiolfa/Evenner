import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";
import avatar from "../../../Images/user.jpg";

export default class EventsListAttendes extends Component {
  render() {
    const { attendee } = this.props;
    return (
      <List.Item>
        <Image
          as={Link}
          to={`/profile/${attendee.id}`}
          size="mini"
          circular
          src={attendee.photoURL || avatar}
        />
      </List.Item>
    );
  }
}
