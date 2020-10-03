import { toastr } from "react-redux-toastr";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  // add user attributes without isLoaded, isEmpty
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await getFirebase().updateProfile(updatedUser);
    toastr.success("Success", " Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};
