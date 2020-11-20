import React, { Component } from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { connect } from "react-redux";

//import components
import EventList from "../EventList/EventList";

//import actions
import { getEventsForDashboard } from "../Redux/eventActions";
import Loading from "../../../Layout/Loading";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

class EventDashboard extends Component {
  //delete an event
  /*handelDeletEvent = (id) => {
    this.props.deleteEvent(id);
  };
*/
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({ moreEvents: true, loadingInitial: false });
    }
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events],
      });
    }
  };
  getNextEvent = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];

    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({ moreEvents: false });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) {
      return <Loading />;
    }
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            loading={loading}
            getNextEvent={this.getNextEvent}
            moreEvents={moreEvents}
            events={loadedEvents}
          />
          {/**  <Button
            loading={loading}
            onClick={this.getNextEvent}
            disabled={!this.state.moreEvents}
            size="large"
            circular
            basic
            floated="right"
            content="More..."
          /> */}
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h1">
            <EventActivity />
          </Header>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

//connect the state
const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading,
});

//connect actions
const actions = {
  getEventsForDashboard,
};

export default connect(
  mapState,
  actions
)(firestoreConnect(["events"])(EventDashboard));
