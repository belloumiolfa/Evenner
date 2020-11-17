import React from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import LazyLoad from "react-lazyload";
const UserDetailedPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />
        <Image.Group size="small">
          {/*lazyload to load photos smoothly*/}
          {photos &&
            photos.map((photo) => (
              <LazyLoad
                key={photo.id}
                height={150}
                placeholder={
                  <Image src={require("../../../Images/user.jpg")} />
                }
              >
                <Image src={photo.photoURL} />{" "}
              </LazyLoad>
            ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};
export default UserDetailedPhotos;
