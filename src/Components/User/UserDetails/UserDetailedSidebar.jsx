import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Segment } from "semantic-ui-react";

const UserDetailedSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
          <Button
            as={Link}
            to="/settings"
            type="submit"
            color="grey"
            circular
            content="Edit Profile"
          />
        ) : (
          <Button type="submit" color="grey" circular content="Follow " />
        )}
      </Segment>
    </Grid.Column>
  );
};
export default UserDetailedSidebar;
