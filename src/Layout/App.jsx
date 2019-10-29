import React, { Component, Fragment } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router";
import { Grid, Container } from "semantic-ui-react";

//import components
import NavBarV from "../Components/Nav/NavBar/NavBarV";
import NavBarH from "../Components/Nav/NavBar/NavBarH";
import EventDashboard from "../Components/Events/EventsDashboard/EventDashboard";
import HomePage from "../Components/Home/HomePage";
import EventDetailsPage from "../Components/Events/EventsDetails/EventDetailsPage";
import PeopleDashboard from "../Components/User/PeopleDashboard/PeopleDashboard";
import UserDetailsPage from "../Components/User/UserDetails/UserDetailsPage";
import SettingsDashboard from "../Components/User/Settings/SettingsDashboard";
import EventForm from "../Components/Events/EventForm/EventForm";
import test from "../Components/testarea/test";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBarH />
              <Grid>
                <Grid.Column width={3}>
                  <NavBarV />
                </Grid.Column>
                <Grid.Column width="13">
                  <Container>
                    <Switch key={this.props.location.key}>
                      <Route exact path="/events" component={EventDashboard} />
                      <Route path="/events/:id" component={EventDetailsPage} />
                      <Route path="/people" component={PeopleDashboard} />
                      <Route path="/profile/:id" component={UserDetailsPage} />
                      <Route path="/settings" component={SettingsDashboard} />
                      <Route
                        path={["/creatEvent", "/manage/:id"]}
                        component={EventForm}
                      />
                      <Route path="/test" component={test} />
                    </Switch>
                  </Container>
                </Grid.Column>
              </Grid>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}
export default withRouter(App);
