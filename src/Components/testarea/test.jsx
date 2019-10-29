import React, { Component } from "react";
import { connect } from "react-redux";

import { incrementCounter, decrementCounter } from "./TestAction";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

class test extends Component {
  state = {
    latLng: { lat: 59.95, lng: 30.33 }
  };
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>test</h1>
        <h3>the answer is : {data}</h3>
        <Button onClick={incrementCounter} positive content="increment" />
        <Button onClick={decrementCounter} negative content="decrement" />
        <br />
        <br />
        <br />
        <TestPlaceInput selecteAdress={this.handleSelect} />{" "}
        <SimpleMap key={this.state.latLng.lng} latLng={this.state.latLng} />
      </div>
    );
  }
}
export default connect(
  mapState,
  actions
)(test);
