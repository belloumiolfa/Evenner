import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";

import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import SocialSignIn from "../SocialSign/SocialSignIn";

const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: composeValidators(
    isRequired("password"),
    hasLengthGreaterThan(6)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
}) => {
  return (
    <div>
      <Form
        size="large"
        autoComplete="off"
        onSubmit={handleSubmit(registerUser)}
      >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Username"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            fluid
            size="large"
            color="grey"
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
        </Segment>
      </Form>
    </div>
  );
};

const actions = {
  registerUser,
};
export default connect(
  null,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
