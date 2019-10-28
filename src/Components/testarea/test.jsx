import React, { Component } from "react";
import { connect } from "react-redux";

import { incrementCounter, decrementCounter } from "./TestAction";
import { Button } from "semantic-ui-react";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

class test extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>test</h1>
        <h3>the answer is : {data}</h3>

        <Button onClick={incrementCounter} positive content="increment" />
        <Button onClick={decrementCounter} negative content="decrement" />
      </div>
    );
  }
}
export default connect(
  mapState,
  actions
)(test);
