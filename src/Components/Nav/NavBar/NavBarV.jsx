import React, { Component } from "react";
import { Menu, Header, Button, Icon } from "semantic-ui-react";

export default class NavBarV extends Component {
  state = { activeItem: "Dashboard" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing vertical>
        <Menu.Item
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={this.handleItemClick}
        >
          <Header as="h3" color="grey">
            <Icon name="dashboard" size="big" />
            Dashboard
          </Header>
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
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
          name="Events"
          active={activeItem === "Events"}
          onClick={this.handleItemClick}
        >
          <Header as="h3" color="grey">
            <Icon name="th list" size="big" />
            Events
          </Header>
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
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

        <Menu.Item align="center">
          <Button icon size="huge" circular>
            <Icon name="angle left" />
          </Button>
          <Button icon size="huge" circular>
            <Icon name="angle right" />
          </Button>
        </Menu.Item>
        <Menu.Item></Menu.Item>
      </Menu>
    );
  }
}
