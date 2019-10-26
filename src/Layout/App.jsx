import React, { Component, Fragment } from "react";
import "./App.css";

import { Grid, Responsive } from "semantic-ui-react";
import NavBarV from "../Components/Nav/NavBar/NavBarV";
import NavBarH from "../Components/Nav/NavBar/NavBarH";
import NavBarVTablet from "../Components/Nav/NavBar/NavBarVTablet";
import NavBarHTablet from "../Components/Nav/NavBar/NavBarHTablet";
import EventDashboard from "../Components/Events/EventsDashboard/EventDashboard";

export default class App extends Component {
  render() {
    return (
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
              <EventDashboard />
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyLargeScreen}></Responsive>
        <Responsive {...Responsive.onlyWidescreen}></Responsive>
      </Fragment>
    );
  }
}
