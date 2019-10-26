import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

export default class EventForm extends Component {
  state = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  //initialise the state with the selectedEvent
  componentDidMount() {
    if (this.props.selectedEvents !== null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }

  //submit data
  handleFormSubmit = () => {
    if (this.state.id) {
      this.props.updateEvent(this.state);
    } else {
      this.props.createEvent(this.state);
    }
    //lagecy form
    //console.log(this.refs.title.value);
  };

  //add data in the inputs
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { cancelFormOpen } = this.props;
    const { title, date, city, venue, hostedBy } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Event Title</label>
            <input
              placeholder="Event Title"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={date}
              onChange={this.handleInputChange}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>

          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={city}
              onChange={this.handleInputChange}
              placeholder="City event is taking place"
            />
          </Form.Field>

          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={venue}
              onChange={this.handleInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>

          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={hostedBy}
              onChange={this.handleInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>

          <Button type="submit" color="green">
            Submit
          </Button>
          <Button type="button" color="grey" onClick={cancelFormOpen}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
