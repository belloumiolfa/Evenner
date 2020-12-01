import React, { Component } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { Segment, Header, Comment } from "semantic-ui-react";

//import components
import EventDetailedChatForm from "./EventDetailedChatForm";

class EventDetailedChat extends Component {
  state = {
    showReolyForm: false,
    selectedCommentId: null,
  };

  handleOpenReplyForm = (id) => () => {
    this.setState({
      showReolyForm: true,
      selectedCommentId: id,
    });
  };
  handleCloseReplyForm = (id) => {
    this.setState({
      showReolyForm: false,
      selectedCommentId: null,
    });
  };
  render() {
    const { addEventComment, eventId, eventChat } = this.props;
    const { showReolyForm, selectedCommentId } = this.state;
    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="grey"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.photoURL} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReolyForm && selectedCommentId === comment.id && (
                        <EventDetailedChatForm
                          addEventComment={addEventComment}
                          eventId={eventId}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  <Comment.Group>
                    {comment.childNodes &&
                      comment.childNodes.map((cmnt) => (
                        <Comment key={cmnt.id}>
                          <Comment.Avatar src={cmnt.photoURL} />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${cmnt.uid}`}
                            >
                              {cmnt.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {formatDistance(cmnt.date, Date.now())} ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{cmnt.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={this.handleOpenReplyForm(cmnt.id)}
                              >
                                Reply
                              </Comment.Action>
                              {showReolyForm &&
                                selectedCommentId === cmnt.id && (
                                  <EventDetailedChatForm
                                    addEventComment={addEventComment}
                                    eventId={eventId}
                                    form={`reply_${cmnt.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={cmnt.parentId}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                  </Comment.Group>
                </Comment>
              ))}
          </Comment.Group>
          <EventDetailedChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form={"newComment"}
            parentId={0}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailedChat;
