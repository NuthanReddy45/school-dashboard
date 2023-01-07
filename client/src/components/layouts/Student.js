import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import SDashboard from "../layouts/SDashboard";
import { Paginate } from "../Paginate";

const Student = () => {
  const { StudentData, setStudentData, isAuth } = useApp();
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
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

  const endIndex = currentPage * postsPerPage;
  const startIndex = endIndex - postsPerPage;

  const curData = StudentData.slice(startIndex, endIndex);

  const paginate = (props) => {
    setcurrentPage(props);
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Link className="text-white" to="/studentsform">
        <button className="btn btn-success my-4" style={{ width: "100%" }}>
          {" "}
          Add Data{" "}
        </button>
      </Link>
      {curData.map((data) => {
        return <SDashboard {...data} key={data._id} />;
      })}
      <Paginate
        postsPerPage={postsPerPage}
        TotalPosts={StudentData.length}
        paginate={paginate}
      />
      {!isAuth && <Navigate to="/" />}
    </div>
  );
};

export default Student;
