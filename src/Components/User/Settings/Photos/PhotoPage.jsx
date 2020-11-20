import React, { useState, useEffect } from "react";
//the function we passeed to useEffect executer after the render is commited to the screen

import {
  Image,
  Segment,
  Header,
  Divider,
  Button,
  Card,
  Step,
  Icon,
} from "semantic-ui-react";
import DropZoneInput from "./DropZoneInput";
import CropperInput from "./CropperInput";

const PhotosPage = () => {
  const [files, setFiles] = useState([]);
  const [setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Step.Group>
        <Step>
          <Step.Content>
            <Step.Title color="teal">Step 1</Step.Title>
            <Step.Description>
              <DropZoneInput setFiles={setFiles} />
            </Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Step.Content>
            <Step.Title color="teal">
              Step 2 <Icon name="expand" />
            </Step.Title>
            <Step.Description>
              {files.length > 0 && (
                <CropperInput
                  setImage={setImage}
                  imagePreview={files[0].preview}
                />
              )}
            </Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Step.Content>
            <Step.Title color="teal">
              Step 3 <Icon name="upload" />
            </Step.Title>
            <Step.Description>
              {files.length > 0 && (
                <div
                  className="img-preview"
                  style={{
                    minHeight: "200px",
                    minWidth: "200px",
                    overflow: "hidden",
                  }}
                />
              )}
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Divider />
      <Header as="h5" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
          <Button>Main Photo</Button>
        </Card>

        <Card>
          <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
          <div className="ui two buttons">
            <Button color="grey">Main</Button>
            <Button basic icon="trash" color="grey" />
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
};

export default PhotosPage;
