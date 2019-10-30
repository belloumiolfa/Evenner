import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { signIn } from "../authActions";
import { connect } from "react-redux";

import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";

const SignInForm = ({ signIn, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(signIn)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="grey">
          SignIn
        </Button>
      </Segment>
    </Form>
  );
};
const actions = {
  signIn
};
export default connect(
  null,
  actions
)(reduxForm({ form: "signInForm" })(SignInForm));
