import React from "react";
import { connect } from "react-redux";

//import components
import TestModal from "./TestModal";
import RegisterModal from "./RegisterModal";
import SignInModal from "./SignInModal";

const modalLookUp = {
  TestModal,
  RegisterModal,
  SignInModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalsManager = ({ currentModal }) => {
  let renderdModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookUp[modalType];
    renderdModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderdModal}</span>;
};

export default connect(mapState)(ModalsManager);
