import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";

const Landing = () => {
  const { isAuth } = useApp();

  console.log("landing");

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">School dashboard</h1>
          {isAuth ? (
            <>
              <p className="lead">View Students and Teachers Data</p>

              <div className="buttons">
                <Link to="/students" className="btn btn-primary">
                  Students Dashboard
                </Link>
                <Link to="/teachers" className="btn btn-light">
                  Teacher Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="lead">
                Create a dashboard for Students and Teachers
              </p>

              <div className="buttons">
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </>
          )}
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
