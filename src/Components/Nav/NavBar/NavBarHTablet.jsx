import React, { Component } from "react";
import avartar from "../../../Images/profile1.jpg";
import {
  Menu,
  Dropdown,
  Grid,
  Icon,
  Header,
  Image,
  Button
} from "semantic-ui-react";

//constants
import { AlertOptions } from "../../../Constants/AlertOptions";
import { MessageOptions } from "../../../Constants/MessageOptions";
import { ProfileInformations } from "../../../Constants/ProfileInformations";

var alerts, msgs;

AlertOptions.map(
  option =>
    (alerts = [
      {
        key: option.key,
        text: (
          <Grid divided="vertically">
            <Grid.Row>
              <Grid.Column width={2}>
                <Icon
                  circular
                  inverted
                  size="massive"
                  name={option.icon}
                  color={option.color}
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <Header as="h5">
                  <span color="grey">{option.description}</span> <br />
                  <span>{option.text}</span>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    ])
);

MessageOptions.map(
  option =>
    (msgs = [
      {
        key: option.key,
        text: (
          <Grid divided="vertically">
            <Grid.Row>
              <Grid.Column width={2}>
                <Image circular src={option.img} />
              </Grid.Column>
              <Grid.Column width={14}>
                <Header as="h5">
                  <span color="grey">{option.sendBy}</span> <br />
                  <span>{option.text}</span>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    ])
);
export default class NavBarHTablet extends Component {
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item>
          <div>
            <Header as="h1" color="grey">
              Evenner
            </Header>
          </div>
        </Menu.Item>
        <Menu.Item>
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
        <Menu.Menu position="right">
          <Dropdown
            item
            trigger={
              <span>
                <Icon name="alarm" size="large" color="grey" />
              </span>
            }
            options={alerts}
            pointing="top right"
            icon={null}
          />
          <Dropdown
            item
            trigger={
              <span>
                <Icon name="mail" size="large" color="grey" />
              </span>
            }
            options={msgs}
            pointing="top right"
            icon={null}
          />
          <Dropdown
            item
            trigger={
              <span>
                <Image avatar src={avartar} />
              </span>
            }
            options={ProfileInformations}
            pointing="top right"
            icon={null}
          />
        </Menu.Menu>
        <Button>
          <Icon name="sign in alternate" size="large" color="grey" />
        </Button>
      </Menu>
    );
  }
}
