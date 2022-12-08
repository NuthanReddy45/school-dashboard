import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNum: "",
    phoneNum: "",
    fatherName: "",
    address: "",
    Class: "",
  });

  const { name, phoneNum, subject, address, Class } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="container">
      <h1 className="large my-3">Teachers Form </h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name "
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="subject "
            name="subject"
            value={subject}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="number"
            placeholder="phoneNum "
            name="phoneNum"
            value={phoneNum}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="address "
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Class "
            name="Class"
            value={Class}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="submit" />
      </form>
    </section>
  );
};

export default TeacherForm;
