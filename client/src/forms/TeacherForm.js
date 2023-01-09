import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Alert from "../components/layouts/Alert";
import { useApp } from "../contexts/AppContext";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNum: "",
    phoneNum: "",
    fatherName: "",
    address: "",
    Class: "",
  });

  const [Key, setKey] = useState(false);
  const [Msg, setMsg] = useState(null);
  const [fileUrl, setfileUrl] = useState("");
  const { isAuth, setTeacherData } = useApp();
  const { name, phoneNum, subject, address, Class } = formData;

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
    const cur = { name, phoneNum, subject, address, Class, fileUrl };
    const body = JSON.stringify(cur);
    try {
      console.log("calling api ..", isAuth);
      let resp = await axios.post(
        "http://localhost:5000/api/teachers",
        body,
        config
      );
      setKey(true);
      setTeacherData(resp.data);
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
        // setTimeout(() => {
        //   setMsg(null);
        // }, 5000)

        Msg.map((cur) => {
          return <Alert {...cur} id={Math.floor(Math.random() * 100)} />;
        })}
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
          <input type="submit" className="btn btn-primary" value="submit" />
        </form>
      </section>
      {/* {Key && setType("Added")} */}
      {Key && <Navigate to="/teachers" />}
      {!isAuth && <Navigate to="/" />}
    </>
  );
};

export default TeacherForm;
