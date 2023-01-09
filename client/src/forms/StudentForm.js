import axios, { Axios } from "axios";
import React, { useState } from "react";
import { Form, Link, Navigate } from "react-router-dom";
import Alert from "../components/layouts/Alert";
import { useApp } from "../contexts/AppContext";
import { image } from "cloudinary-react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNum: "",
    phoneNum: "",
    fatherName: "",
    address: "",
    Class: "",
  });

  const [Key, setKey] = useState(false);
  const [fileUrl, setfileUrl] = useState("");
  const [Msg, setMsg] = useState(null);
  const { isAuth, setStudentData, setType } = useApp();
  const { name, rollNum, phoneNum, fatherName, address, Class } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": isAuth,
      },
    };
    const cur = {
      name,
      phoneNum,
      fatherName,
      rollNum,
      address,
      Class,
      fileUrl,
    };
    const body = JSON.stringify(cur);
    try {
      console.log("calling api ..", isAuth);
      let resp = await axios.post(
        "http://localhost:5000/api/students",
        body,
        config
      );
      setKey(true);
    } catch (err) {
      const msg = err.response.data.errors;
      setMsg([...msg]);
      console.log("err in submission ", err);
    }
  };

  const uploadImage = ({ file }) => {
    if (!file) {
      return Alert("Please select a File ", "danger");
    }
    const curData = new FormData();
    curData.append("file", file);
    curData.append("upload_preset", "varaprasad");
    try {
      const GetLink = async () => {
        let resp = await axios.post(
          "https://api.cloudinary.com/v1_1/dsxylh1z6/image/upload",
          curData
        );
        const temp = resp["data"]["secure_url"];
        console.log("succes uploading ", temp);
        setfileUrl(temp);
        console.log("in form in upload ", fileUrl);
      };
      GetLink();
    } catch (err) {
      console.log("err in image upload", err);
    }
  };

  return (
    <>
      {Msg &&
        Msg.map((cur) => {
          return <Alert {...cur} key={Math.floor(Math.random() * 100)} />;
        })}
      <section className="container">
        <h1 className="large text-primary">Students Form </h1>
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
              type="number"
              placeholder="rollNum "
              name="rollNum"
              value={rollNum}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="fatherName "
              name="fatherName"
              value={fatherName}
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

          <div>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                uploadImage({ file: e.target.files[0] });
              }}
            />
          </div>
          <br></br>

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </section>
      {Key && setType("Added")}
      {Key && <Navigate to="/students" />}
      {!isAuth && <Navigate to="/" />}
    </>
  );
};

export default StudentForm;
