import React, { Component } from "react";
import { Menu, Header } from "semantic-ui-react";
import { connect } from "react-redux";
//constants
import { Link, withRouter } from "react-router-dom";

//import components
import SignedInMenu from "../menu/SignedInMenu";
import SignOutMenu from "../menu/SignOutMenu";
import { openModal } from "../../Modals/modalActions";
import { signOut } from "../../Authentification/authActions";

class NavBarH extends Component {
  //sign in
  handleSignIn = () => {
    this.props.openModal("SignInModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  //sign out
  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authentification;
    return (
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/">
          <Header as="h1" color="grey">
            Evenner
          </Header>
        </Menu.Item>
        <Menu as={Link} to="/test">
          test
        </Menu>
        <Menu.Menu position="right">
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              currentUser={auth.currentUser}
            />
          ) : (
            <SignOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapState = state => ({
  auth: state.auth
});

const actions = {
  openModal,
  signOut
};

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBarH)
);
