import React, { Component } from "react";
import { connect } from "react-redux";

import { incrementAsync, decrementAsync } from "./TestAction";

import { Button } from "semantic-ui-react";

import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { openModal } from "../../Components/Modals/modalActions";

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
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
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>test</h1>
        <h3>the answer is : {data}</h3>
        <Button
          name="increment"
          onClick={e => incrementAsync(e.target.name)}
          positive
          content="increment"
          loading={buttonName === "increment" && loading}
        />
        <Button
          name="decrement"
          onClick={e => decrementAsync(e.target.name)}
          negative
          content="decrement"
          loading={buttonName === "decrement" && loading}
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          content="open modal"
        />
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
