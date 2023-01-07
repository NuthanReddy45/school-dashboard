import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import { Paginate } from "../Paginate";

import TDashboard from "./TDashboard";

const Teacher = () => {
  const { TeacherData, setTeacherData, isAuth } = useApp();
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(2);

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
        setTeacherData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  const endIndex = currentPage * postsPerPage;
  const startIndex = endIndex - postsPerPage;

  const curData = TeacherData.slice(startIndex, endIndex);

  const paginate = (props) => {
    setcurrentPage(props);
  };

  return (
    <>
      <div style={{ width: "80%", margin: "20px auto" }}>
        <Link className="text-white" to="/teachersform">
          <button className="btn btn-success my-4" style={{ width: "100%" }}>
            {" "}
            Add Data{" "}
          </button>
        </Link>
        {curData.map((data) => {
          return <TDashboard {...data} key={data._id} />;
        })}
        <Paginate
          postsPerPage={postsPerPage}
          TotalPosts={TeacherData.length}
          paginate={paginate}
        />
      </div>
      {!isAuth && <Navigate to="/" />}
    </>
  );
};

export default Teacher;
