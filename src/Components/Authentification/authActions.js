import { closeModal } from "../Modals/modalActions";
import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";

export const signIn = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const user = await getFirebase()
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
  };
};

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    let createdUser = await getFirebase()
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    //update profile
    await createdUser.user.updateProfile({
      displayName: user.displayName,
    });

    //create new user profile
    let newUser = {
      displayName: user.displayName,
      createdAt: getFirestore().FieldValue.serverTimestamp(),
    };

    //set the new user into the firestore
    await getFirestore().set(`users/${createdUser.user.uid}`, {
      ...newUser,
    });

    //close the modal
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
  }
};

export const socialSignIn = (selectedProvider) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(closeModal());
      const user = await getFirebase().login({
        provider: selectedProvider,
        type: "popup",
      });
      console.log("dgfgdergdr", user);

      if (user.additionalUserInfo.isNewUser) {
        await getFirestore().set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: getFirestore().FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updatePassword = (creds) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const user = getFirebase().auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    //get notification
    toastr.success("Success", "Your Password has been updated");
    //reset the form
    await dispatch(reset("account"));
  } catch (error) {
    throw new SubmissionError({
      _error: error.message,
    });

    //console.log(error);
  }
};
