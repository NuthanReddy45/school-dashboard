import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNum: "",
    phoneNum: "",
    fatherName: "",
    address: "",
    Class: "",
  });

  const { name, rollNum, phoneNum, fatherName, address, Class } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Students Form </h1>
      <p className="lead">
        <i className="fas fa-user" /> Please fill the below details
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name "
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="rollNum "
            name="rollNum"
            value={rollNum}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="fatherName "
            name="fatherName"
            value={fatherName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="phoneNum "
            name="phoneNum"
            value={phoneNum}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="address "
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
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

export default StudentForm;
