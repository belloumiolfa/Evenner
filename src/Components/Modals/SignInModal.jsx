import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import SignInForm from "../Authentification/SignIn/SignInForm";
import { closeModal } from "./modalActions";

const actions = { closeModal };

class SignInModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
        <Modal.Header>Sign-In to Evenner</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <SignInForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(SignInModal);
