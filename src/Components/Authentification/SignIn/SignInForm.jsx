import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { signIn, socialSignIn } from "../authActions";
import { connect } from "react-redux";

import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";
import SocialSignIn from "../SocialSign/SocialSignIn";

const SignInForm = ({ signIn, handleSubmit, error, socialSignIn }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(signIn)} autoComplete="on">
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
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button fluid size="large" color="grey">
          SignIn
        </Button>
        <Divider horizontal>Or </Divider>

        <SocialSignIn socialSignIn={socialSignIn} />
      </Segment>
    </Form>
  );
};
const actions = {
  signIn,
  socialSignIn
};
export default connect(
  null,
  actions
)(reduxForm({ form: "signInForm" })(SignInForm));
