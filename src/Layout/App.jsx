import React, { Component, Fragment } from "react";
import "./App.css";

import { Grid, Responsive } from "semantic-ui-react";
import NavBarV from "../Components/Nav/NavBar/NavBarV";
import NavBarH from "../Components/Nav/NavBar/NavBarH";
import NavBarVTablet from "../Components/Nav/NavBar/NavBarVTablet";
import NavBarHTablet from "../Components/Nav/NavBar/NavBarHTablet";
import EventDashboard from "../Components/Events/EventsDashboard/EventDashboard";
import { Route } from "react-router";
import HomePage from "../Components/Home/HomePage";
import EventDetailsPage from "../Components/Events/EventsDetails/EventDetailsPage";
import PeopleDashboard from "../Components/User/PeopleDashboard/PeopleDashboard";
import UserDetailsPage from "../Components/User/UserDetails/UserDetailsPage";
import SettingsDashboard from "../Components/User/Settings/SettingsDashboard";
import EventForm from "../Components/Events/EventForm/EventForm";
import test from "../Components/testarea/test";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <Responsive {...Responsive.onlyMobile}>Mobile</Responsive>
              <Responsive {...Responsive.onlyTablet}>
                <NavBarHTablet />
                <Grid className="main">
                  <Grid.Column width={3}>
                    <NavBarVTablet />
                  </Grid.Column>
                  <Grid.Column width="13">
                    <h1>content page </h1>
                  </Grid.Column>
                </Grid>
              </Responsive>
              <Responsive {...Responsive.onlyComputer}>
                <NavBarH />
                <Grid>
                  <Grid.Column width={3}>
                    <NavBarV />
                  </Grid.Column>
                  <Grid.Column width="13">
                    <Route exact path="/events" component={EventDashboard} />
                    <Route path="/events/:id" component={EventDetailsPage} />
                    <Route path="/people" component={PeopleDashboard} />
                    <Route path="/profile/:id" component={UserDetailsPage} />
                    <Route path="/settings" component={SettingsDashboard} />
                    <Route path="/creatEvent" component={EventForm} />
                    <Route path="/test" component={test} />
                  </Grid.Column>
                </Grid>
              </Responsive>
              <Responsive {...Responsive.onlyLargeScreen}></Responsive>
              <Responsive {...Responsive.onlyWidescreen}></Responsive>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}
