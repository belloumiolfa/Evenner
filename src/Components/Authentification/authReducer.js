import { createRducer } from "../../Layout/Redux/reducerUtils";
import { SIGN_OUT_USER, SIGN_IN_USER } from "./authConst";

const initialState = {
  authentification: false,
  currentUser: null
};

const signInUser = (state, payload) => {
  return {
    authentification: true,
    currentUser: payload.creds.email
  };
};

const signOutUser = (state, payload) => {
  return {
    authentification: false,
    currentUser: null
  };
};

export default createRducer(initialState, {
  [SIGN_OUT_USER]: signOutUser,
  [SIGN_IN_USER]: signInUser
});
