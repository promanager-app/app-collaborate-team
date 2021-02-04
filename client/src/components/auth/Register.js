import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import "./Auth.scss";
import logo from '../../img/pie.png'
import play from '../../img/play.png'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
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

            <div className="three-row" style={{marginTop: '4vw'}}>
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
                {/* <div className="auth-label">Name</div> */}
                <i className="las la-user"></i>

                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className="auth-input"
                  autoComplete="off"
                  placeholder="Username"
                />
                <div className="auth-error">{errors.name}</div>
              </label>
            </div>

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
                <div className="auth-error">{errors.email}</div>
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
                <div className="auth-error">{errors.password}</div>
              </label>
            </div>

            <div>
              <button type="submit" className="auth-button">
                start collaborating!
              </button>
            </div>
            
            <div className="bottom-group">
            <Link to="/" className="link">
              Already have an account?
              <span className="link-sign"> Sign in</span>
            </Link>
          </div>
          
          </div>

        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
