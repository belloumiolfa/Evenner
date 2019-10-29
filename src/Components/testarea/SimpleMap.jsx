import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = ({ text }) => (
  <Icon name="marker" size="big" color="red" />
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const { latLng } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAo7LXq2n9WArZCdJyiyQPusZ4U9NBxSts" }}
          defaultCenter={latLng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
