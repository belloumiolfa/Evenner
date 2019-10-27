import React, { Component } from "react";
import { Menu, Header } from "semantic-ui-react";

//constants
import { Link, withRouter } from "react-router-dom";
import SignedInMenu from "../menu/SignedInMenu";
import SignOutMenu from "../menu/SignOutMenu";

class NavBarH extends Component {
  state = {
    auth: true
  };
  //sign in
  handleSignIn = () => this.setState({ auth: true });

  //sign out
  handleSignOut = () => {
    this.setState({ auth: false });
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.state;

    return (
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/">
          <Header as="h1" color="grey">
            Evenner
          </Header>
        </Menu.Item>

        <Menu.Menu position="right">
          {auth ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignOutMenu signIn={this.handleSignIn} />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}
export default withRouter(NavBarH);
