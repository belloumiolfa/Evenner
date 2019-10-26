import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

export default class NavBarVTablet extends Component {
  state = { activeItem: "Dashboard" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon="labeled" pointing vertical align="left">
        <Menu.Item
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={this.handleItemClick}
        >
          <Icon name="dashboard" color="grey" />
          Dashboard
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
          name="Hangout Club"
          active={activeItem === "Hangout Club"}
          onClick={this.handleItemClick}
        >
          <Icon name="flag checkered" color="grey" />
          Hangout Club
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
          name="Events"
          active={activeItem === "Events"}
          onClick={this.handleItemClick}
        >
          <Icon name="th list" color="grey" />
          Events
        </Menu.Item>
        <Menu.Item></Menu.Item>

        <Menu.Item
          name="People"
          active={activeItem === "People"}
          onClick={this.handleItemClick}
        >
          <Icon name="users" color="grey" />
          People
        </Menu.Item>
        <Menu.Item></Menu.Item>
      </Menu>
    );
  }
}
