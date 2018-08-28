import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import FormControl from "../common/FormControl";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  componentWillReceiveProps(props) {
    if (props.auth && props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (props.errors) {
      this.setState({ errors: props.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth && this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <FormControl
                  name="email"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  placeholder="Email Address"
                  error={errors.email}
                />
                <FormControl
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  placeholder=""
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateProps,
  { loginUser }
)(withRouter(Login));
