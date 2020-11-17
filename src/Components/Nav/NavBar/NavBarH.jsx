import React, { Component } from "react";
import { Menu, Header } from "semantic-ui-react";
import { connect } from "react-redux";

//import firebe
import { withFirebase } from "react-redux-firebase";

//constants
import { Link, withRouter } from "react-router-dom";

//import components
import SignedInMenu from "../menu/SignedInMenu";
import SignOutMenu from "../menu/SignOutMenu";
import { openModal } from "../../Modals/modalActions";

class NavBarH extends Component {
  //open the sign in modal
  handleSignIn = () => {
    this.props.openModal("SignInModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  //sign out
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
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
              auth={auth}
              signOut={this.handleSignOut}
              profile={profile}
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

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const actions = {
  openModal,
};

//connect withFirebase
export default withRouter(withFirebase(connect(mapState, actions)(NavBarH)));
