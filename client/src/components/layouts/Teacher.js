import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import Dashboard from "../layouts/Dashboard";

const Teacher = () => {
  const { TeacherData, setTeacherData, isAuth } = useApp();
  console.log("here = ", TeacherData);

  useEffect(() => {
    const fun = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": isAuth,
          },
        };
        let resp = await axios.get(
          "http://localhost:5000/api/teachers",
          config
        );
        console.log("stu data =  ", resp);
        setTeacherData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  return (
    <>
      <div className="text-center" style={{ margin: "10px auto" }}>
        {TeacherData.map((data) => {
          return <Dashboard {...data} key={data._id} />;
        })}
      </div>
      <Link to="/teachersform"> Add Data </Link>
    </>
  );
};

export default Teacher;
