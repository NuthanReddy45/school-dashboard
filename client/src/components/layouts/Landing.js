import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Landing = () => {
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">School dashboard</h1>
          <p className="lead">Create a dashboard for Students and Teachers</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </section>
  );
};

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default Landing;
