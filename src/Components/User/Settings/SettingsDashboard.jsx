import React from "react";
import { Grid } from "semantic-ui-react";
import SettingsNav from "./SettingsNav";
import { Route, Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { updatePassword } from "../../Authentification/authActions";
import { updateProfile } from "../../User/userActions";
//import components
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotoPage from "./Photos/PhotoPage";
import AccountPage from "./AccountPage";

const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/settings/about"
            render={() => <AboutPage updateProfile={updateProfile} />}
          />
          <Route path="/settings/photo" component={PhotoPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};
const mapState = state => ({
  providerId:
    state.firebase.auth.isLoaded &&
    state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});
const actions = {
  updatePassword,
  updateProfile
};
export default connect(mapState, actions)(SettingsDashboard);
