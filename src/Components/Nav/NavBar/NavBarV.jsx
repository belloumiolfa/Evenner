import React, { Component, Fragment } from "react";
import { Menu, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBarV extends Component {
  state = { activeItem: "Events" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { auth } = this.props;
    const authentification = auth.authentification;

    return (
      <Menu pointing vertical>
        {authentification && (
          <Menu.Item
            as={Link}
            to="/"
            name="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={this.handleItemClick}
          >
            <Header as="h3" color="grey">
              <Icon name="dashboard" size="big" />
              Dashboard
            </Header>
          </Menu.Item>
        )}

        <Menu.Item></Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          name="Hangout Club"
          active={activeItem === "Hangout Club"}
          onClick={this.handleItemClick}
        >
          <Header as="h3" color="grey">
            <Icon name="flag checkered" size="big" />
            Hangout Club
          </Header>
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
          as={Link}
          to="/events"
          name="Events"
          active={activeItem === "Events"}
          onClick={this.handleItemClick}
        >
          <Header as="h3" color="grey">
            <Icon name="calendar" size="big" />
            Events
          </Header>
        </Menu.Item>
        <Menu.Item></Menu.Item>
        {authentification && (
          <Fragment>
            <Menu.Item
              as={Link}
              to="/people"
              name="People"
              active={activeItem === "People"}
              onClick={this.handleItemClick}
            >
              <Header as="h3" color="grey">
                <Icon name="users" size="big" />
                People
              </Header>
            </Menu.Item>
            <Menu.Item></Menu.Item>

            <Menu.Item
              as={Link}
              to="/creatEvent"
              name="New Event"
              active={activeItem === "New Event"}
              onClick={this.handleItemClick}
            >
              <Header as="h3" color="grey">
                <Icon name="add" size="big" />
                New Event
              </Header>
            </Menu.Item>
            <Menu.Item></Menu.Item>
          </Fragment>
        )}
      </Menu>
    );
  }
}
const mapState = state => ({
  auth: state.auth
});

export default connect(mapState)(NavBarV);
