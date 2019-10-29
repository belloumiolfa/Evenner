/*global google */

import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../Redux/eventActions";
import avartar from "../../../Images/profile1.jpg";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

//import components
import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";
import TextArea from "../../../Layout/Redux/ReduxForm/TextArea";
import SelectInput from "../../../Layout/Redux/ReduxForm/SelectInput";
import DateInput from "../../../Layout/Redux/ReduxForm/DateInput";
import PlaceInput from "../../../Layout/Redux/ReduxForm/PlaceInput";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required " }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired({ message: "The city is required " }),
  venue: isRequired({ message: "The venue is required " }),
  date: isRequired({ message: "The date is required " })
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  };
  //submit data
  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        //create the new event
        id: cuid(),
        hostPhotoURL: avartar,
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(res => getLatLng(res[0]))
      .then(latLng => {
        this.setState({
          cityLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(res => getLatLng(res[0]))
      .then(latLng => {
        this.setState({
          venueLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header content="Event details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="Give your event name.."
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                multiple={false}
                placeholder="What is your event about ?"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell us more about your event .."
              />
              <Header content="Event Location details" />

              <Field
                name="city"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder="Event City"
              />
              <Field
                name="venue"
                component={PlaceInput}
                placeholder="Event Venue"
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ["establishment"]
                }}
                onSelect={this.handleVenueSelect}
              />
              <Field
                name="date"
                component={DateInput}
                placeholder="Event Date"
              />

              <Button
                type="submit"
                color="grey"
                circular
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button
                type="button"
                color="grey"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
                basic
                circular
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = (state, ownProps) => {
  const eventID = ownProps.match.params.id;

  let event = {};

  if (eventID && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventID)[0];
  }

  //let redux form take care about the initialisation and passe it
  return { initialValues: event };
};

const actions = {
  createEvent,
  updateEvent
};

//we passing our props to redux form to has access to the initial value
export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
