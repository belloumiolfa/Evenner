import { MODAL_OPEN, MODAL_CLOSE } from "./modalConstants";
import { createRducer } from "../../Layout/Redux/reducerUtils";

const initialState = null;

const openModal = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { modalType, modalProps };
};

const closeModal = () => {
  return null;
};

export default createRducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
});
