import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import logo from '../../img/pie.png'
import play from '../../img/play.png'

import "./Auth.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  fillDemoEmail = () => {
    this.setState({ email: "test@test.com" });
  };

  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
        {/* <div className="auth-header">Sign In</div> */}
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>

          <div className="auth-left">
            
            <div className="one-row">
              <i className="las la-chalkboard"></i>
              <div className="logo-text">collaborate.team</div>
            </div>

            <div className="two-row">
              <div className="hero-text">Create Teams, Project
              Mind Maps & Organize Meetings</div>
            </div>

            <div className="three-row">
              <div className="demo-video">
                <div className="demo-video-circle">
                  <img className="play-logo" src={play} alt="Play" />
                </div>
                <span className="watch-demo">Watch demo</span>
              </div>
            </div>

          </div>

          <div className="auth-right">

            <div className="row-one">
              <img className="pie-logo" src={logo} alt="Logo" />
            </div>

            <div className="row-two">
              Join and create your team <br /> over 27 teams around the globe
            </div>

            <div className="row-three">
              Create multiple projects and invite all your team members. Assign tasks, create deadlines, organize meetings and lead your team.
            </div>

            {/* input fields */}
            <div className="auth-group">
              <label>
                {/* <div className="auth-label">Email address</div> */}
                <i className="las la-envelope "></i>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="auth-input"
                  autoComplete="off"
                  placeholder="Email"
                />
                <div className="auth-error">
                  {errors.email}
                  {errors.emailnotfound}
                </div>
              </label>
            </div>
            <div className="auth-group">
              <label>
                {/* <div className="auth-label">Password</div> */}
                <i className="las la-unlock"></i>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="auth-input"
                  autoComplete="off"
                  placeholder="Password"
                />
                <div className="auth-error">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>
              </label>
            </div>

            {/* login btn */}
            <div>
              <button type="submit" className="auth-button">
                start collaborating!
            </button>
            </div>

            {/* sign up */}
            <div className="bottom-group">
              <Link to="/register" className="link">
                Don't have an account? 
                <span className="link-sign"> Sign up</span>
            </Link>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
