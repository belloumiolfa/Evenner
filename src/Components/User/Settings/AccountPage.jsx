import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  matchesField,
  hasLengthGreaterThan
} from "revalidate";

import TextInput from "../../../Layout/Redux/ReduxForm/TextInput";

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({ message: "The password is required." }),
    hasLengthGreaterThan(5)({
      message: "Passwords needs to be at least 6 characters."
    })
  )(),
  newPassword2: composeValidators(
    isRequired({ message: "The confirm password is required." }),
    matchesField("newPassword1")({ message: "Passwords do not match." })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === "password" && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline
              component={TextInput}
              basic
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline
              basic
              circular
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              size="large"
              content="Update Password"
              basic
              circular
              disabled={invalid || submitting}
            />
          </Form>
        </div>
      )}
      {providerId && providerId === "facebook.com" && (
        <div>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook" circular>
            <Icon name="facebook" />
            Go to Facebook
          </Button>
        </div>
      )}
      {providerId && providerId === "google.com" && (
        <div>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus" circular>
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
};

export default reduxForm({ form: "account", validate })(AccountPage);
