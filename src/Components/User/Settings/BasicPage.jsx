import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import DateInput from "../../../Layout/Redux/ReduxForm/DateInput";
import PlaceInput from "../../../Layout/Redux/ReduxForm/PlaceInput";
import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";
import RadioInput from "../../../Layout/Redux/ReduxForm/RadioInput";
import { addYears } from "date-fns";

class BasicPage extends Component {
  render() {
    const { pristine, submitting, updateProfile, handleSubmit } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label> Gender:</label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />

            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            dateFormat="dd LLL yyyy"
            showTimeSelect={false}
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={addYears(new Date(), -18)}
          />
          <Field
            name="city"
            placeholder="Home Town"
            options={{ types: ["(cities)"] }}
            label="Female"
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button
            basic
            circular
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(BasicPage);
