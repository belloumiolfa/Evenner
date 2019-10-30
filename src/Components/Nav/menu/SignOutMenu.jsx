import React, { Fragment } from "react";
import { Button, Menu } from "semantic-ui-react";

const SignOutMenu = ({ signIn, register }) => {
  return (
    <Fragment>
      <Menu.Item position="right">
        <Button content="Register" basic onClick={register}></Button>
      </Menu.Item>
      <Menu.Item>
        <Button content="Sign-In" basic onClick={signIn}></Button>
      </Menu.Item>
    </Fragment>
  );
};

export default SignOutMenu;
