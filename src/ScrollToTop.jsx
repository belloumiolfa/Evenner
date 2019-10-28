import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  //scroll to top in each move to an other direction
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
