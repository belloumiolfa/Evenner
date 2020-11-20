import { format } from "date-fns/esm";
import React from "react";
import { Grid, Header, Icon, Item, List, Segment } from "semantic-ui-react";

const UserDetailedDescription = ({ profile }) => {
  //calculate created at
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), "d MMM yyyy");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content="About Display Name" />
            <p>
              I am a: <strong>{profile.occupation || "tbn"}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || "tbn"}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            {profile.interestes ? (
              <List>
                {profile.interestes &&
                  profile.interestes.map((interest, index) => (
                    <Item>
                      <Icon name="heart" />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))}
              </List>
            ) : (
              <p>No interestes</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
