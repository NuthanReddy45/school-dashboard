import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import SDashboard from "../layouts/SDashboard";

const Student = () => {
  const { StudentData, setStudentData, isAuth } = useApp();
  useEffect(() => {
    const fun = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": isAuth,
          },
        };
        let resp = await axios.get(
          "http://localhost:5000/api/students",
          config
        );
        setStudentData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Link className="text-white" to="/studentsform">
        <button className="btn btn-success my-4" style={{ width: "100%" }}>
          {" "}
          Add Data{" "}
        </button>
      </Link>
      {StudentData.map((data) => {
        return <SDashboard {...data} key={data._id} />;
      })}

      {!isAuth && <Navigate to="/" />}
    </div>
  );
};

export default Student;
