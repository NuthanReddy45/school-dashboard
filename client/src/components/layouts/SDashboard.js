import axios from "axios";
import React, { Fragment, useState } from "react";
import { useApp } from "../../contexts/AppContext";

const Dashboard = ({
  name,
  _id,
  rollNum,
  fatherName,
  address,
  Class,
  phoneNum,
}) => {
  const { setStudentData, isAuth, setType } = useApp();

  const [Key, setKey] = useState(null);

  const DeleteItem = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": isAuth,
      },
    };
    try {
      let resp = await axios.delete(
        `http://localhost:5000/api/students/${_id}`,
        config
      );
      setKey(true);
      setStudentData(resp.data);
    } catch (err) {
      console.log("error deleting ", err);
    }
  };

  const EditItem = () => {};

  return (
    <div className="card mb-3 px-3" style={{ width: "100%" }}>
      <div className="row g-0">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">
            {rollNum && <small className="text-muted">{rollNum}</small>}
            {fatherName && <small className="text-muted">{fatherName}</small>}
          </p>
          <p className="card-text">
            {address} {phoneNum}
          </p>
          <div>{Class}</div>
        </div>
      </div>
      <button className="btn btn-danger" onClick={DeleteItem}>
        Delete
      </button>
      {Key && setType("Deleted")}
    </div>
  );
};

export default Dashboard;
