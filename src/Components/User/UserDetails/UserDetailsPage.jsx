import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedSidebar from "./UserDetailedSidebar";
import { userDetailedQuery } from "../../User/userQuery";
import Loading from "../../../Layout/Loading";

class UserDetailedPage extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some((a) => a === true);
    if (loading) return <Loading />;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        <UserDetailedPhotos photos={photos} />
        <UserDetailedEvents />
      </Grid>
    );
  }
}
/*
const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos,
});*/

// to check to see what user curently trying to get to

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.id) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
  };
};

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
