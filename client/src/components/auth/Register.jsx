import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import propTypes from "prop-types";
import FormControl from "../common/FormControl";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      verifyPassword: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log({ ...this.state });

    this.props.registerUser(this.state, this.props.history);
  }

  componentWillReceiveProps(props) {
    if (props.errors) {
      this.setState({ errors: props.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <FormControl
                  name="name"
                  value={this.state.name}
                  error={errors.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />
                <FormControl
                  name="email"
                  type="email"
                  value={this.state.email}
                  error={errors.email}
                  onChange={this.onChange}
                  placeholder="Email"
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <FormControl
                  type="password"
                  name="password"
                  value={this.state.password}
                  error={errors.password}
                  onChange={this.onChange}
                  placeholder="Password"
                />
                <FormControl
                  type="password"
                  name="confirm-password"
                  value={this.state.verifyPassword}
                  error={errors.verifyPassword}
                  onChange={this.onChange}
                  placeholder="Confirm Password"
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

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.shape({
    user: propTypes.object
  }).isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
