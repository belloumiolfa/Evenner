import React, { Component, Fragment } from "react";
import { Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import avatar from "../../../Images/profile1.jpg";
import { Link } from "react-router-dom";

export default class SignedInMenu extends Component {
  render() {
    const { signOut } = this.props;

    return (
      <Fragment>
        <Menu.Item position="right">
          <div className="ui left aligned category search item">
            <div className="ui transparent icon input">
              <input
                className="prompt"
                type="text"
                placeholder="Search for ..."
              />
              <Icon name="search" size="large" />{" "}
            </div>
            <div className="results" />
          </div>
        </Menu.Item>
        <Menu.Item>
          <Image avatar spaced="right" src={avatar} />
          <Dropdown pointing="top left" text="Username">
            <Dropdown.Menu>
              <Dropdown.Item text="Create Event" icon="plus" />
              <Dropdown.Item text="My Events" icon="calendar" />
              <Dropdown.Item text="My Network" icon="users" />
              <Dropdown.Item text="My activities" icon="list" />
              <Dropdown.Item text="My Profile" icon="user" />
              <Dropdown.Item
                text="Settings"
                icon="settings"
                as={Link}
                to="/settings"
              />
              <Dropdown.Item text="Sign Out" icon="power" onClick={signOut} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Fragment>
    );
  }
}