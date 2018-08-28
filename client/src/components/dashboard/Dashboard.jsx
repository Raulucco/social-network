import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLoggedProfile } from "../../actions/profile";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.propsgetLoggedProfile();
  }

  render() {
    return "";
  }
}

Dashboard.propTypes = {
  getLoggedProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { getLoggedProfile }
)(Dashboard);
