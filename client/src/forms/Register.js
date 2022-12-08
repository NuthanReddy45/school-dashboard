import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../contexts/AppContext";

const Register = () => {
  const { isAuth, setisAuth } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("nope..");
      <div className={`alert alert-danger`}>Passwords do not match</div>;
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const cur = { name, email, password };
      const body = JSON.stringify(cur);
      try {
        let resp = await axios.post("/api/auth/register", body, config);
        setisAuth(resp.data.token);
        console.log(resp.data);
        // <Navigate to="/" replace />;
      } catch (err) {
        console.log("eror in register", err);
      }
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>

      {isAuth && <Navigate to="/home" />}
    </>
  );
};

export default Register;