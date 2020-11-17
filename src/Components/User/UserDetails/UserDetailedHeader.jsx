import { differenceInYears } from "date-fns";
import React from "react";
import LazyLoad from "react-lazyload";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import avatar from "../../../Images/user.jpg";

const UserDetailedHeader = ({ profile }) => {
  //age calculation
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image src={require("../../../Images/user.jpg")} />
              }
            >
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || avatar}
              />
            </LazyLoad>

            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              <Header as="h3">{profile.occupation}</Header>
              <br />
              <Header as="h3">
                {age}, Lives in {profile.city || "unknown city"}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};
export default UserDetailedHeader;
