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
  ImageUrl,
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
    // <div className="card mb-3 px-3" style={{ width: "100%" }}>
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card p-2 text-center">
            <div className="row">
              <div className="col-md-7 border-right no-gutters">
                <div className="py-3">
                  <img src={ImageUrl} width="200" className="rounded-circle" />
                  <h4 className="text-secondary">{name}</h4>

                  <div className="stats">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex flex-column">
                              {" "}
                              <span className="text-left head">
                                RollNumber
                              </span>{" "}
                              <span className="text-left bottom">
                                {rollNum}
                              </span>{" "}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              {" "}
                              <span className="text-left head">
                                fatherName
                              </span>{" "}
                              <span className="text-left bottom">
                                {fatherName}
                              </span>{" "}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="px-3">
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={DeleteItem}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="py-3">
                  <div>
                    {" "}
                    <span className="d-block head">Home Address</span>{" "}
                    <span className="bottom">{address}</span>{" "}
                  </div>
                  <div className="mt-4">
                    {" "}
                    <span className="d-block head">Mobile Phone</span>{" "}
                    <span className="bottom">{phoneNum}</span>{" "}
                  </div>
                  <div className="mt-4">
                    {" "}
                    <span className="d-block head">Class </span>{" "}
                    <span className="bottom">{Class}</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="row g-0">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">
            <img
              src={ImageUrl}
              style={{ height: 200, width: 200 }}
              className="rounded float-right"
            />
            <div>
              {rollNum && <small className="text-muted">{rollNum}</small>}
            </div>
            {fatherName && <small className="text-muted">{fatherName}</small>}
          </p>
          <p className="card-text">
            {address} {phoneNum}
          </p>
          <div>{Class}</div>
        </div>
      </div> */}
      {/* <button className="btn btn-danger" onClick={DeleteItem}>
        Delete
      </button> */}
      {Key && setType("Deleted")}
    </div>
  );
};
export default Dashboard;
