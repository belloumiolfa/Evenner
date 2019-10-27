import React, { Fragment } from "react";
import { Button, Menu } from "semantic-ui-react";

const SignOutMenu = ({ signIn }) => {
  return (
    <Fragment>
      <Menu.Item position="right">
        <Button content="Sign-up" basic></Button>
      </Menu.Item>
      <Menu.Item>
        <Button content="Sign-In" basic onClick={signIn}></Button>
      </Menu.Item>
    </Fragment>
  );
};

export default SignOutMenu;
