import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import SDashboard from "../layouts/SDashboard";
import { Paginate } from "../Paginate";

const Student = () => {
  const { StudentData, setStudentData, isAuth } = useApp();
  const [currentPage, setcurrentPage] = useState(1);
  const [Filter, setFilter] = useState("Filter By");
  const [ItemsperPage, setItemsperPage] = useState("");
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
      <div className="d-flex justify-content-between">
        <div className="form-group ">
          <input
            type="number"
            className="form-group"
            value={ItemsperPage}
            placeholder="Items per page"
            onChange={(e) => {
              setItemsperPage(e.target.value);
            }}
          />
          <span> &ensp; </span>
          <button
            className=" .btn-sm btn-info "
            onClick={(e) => {
              setpostsPerPage(ItemsperPage);
            }}
          >
            Confirm
          </button>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {Filter}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  const temp = curData;
                  temp.sort((a, b) => {
                    if (a.rollNum > b.rollNum) return 1;
                    if (a.rollNum < b.rollNum) return -1;
                    return 0;
                  });
                  setFilter("Roll Number");
                  setStudentData(temp);
                }}
              >
                RollNumber
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  const temp = curData;
                  temp.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  });
                  setFilter("Name");
                  setStudentData(temp);
                }}
              >
                Name
              </button>
            </li>

            <li>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  const temp = curData;
                  temp.sort((a, b) => {
                    if (a.Class > b.Class) return 1;
                    if (a.Class < b.Class) return -1;
                    return 0;
                  });
                  setStudentData(temp);
                  setFilter("Class");
                }}
              >
                Class
              </button>
            </li>
          </ul>
        </div>
      </div>

      {curData.map((data) => {
        return <SDashboard {...data} key={data._id} />;
      })}
      <Paginate
        postsPerPage={postsPerPage}
        TotalPosts={StudentData.length}
        paginate={paginate}
      />

      <Link className="text-white" to="/studentsform">
        <div className="px-3">
          <button
            className="btn btn-success my-4 form-control"
            style={{ width: "100%" }}
          >
            {" "}
            Add Data{" "}
          </button>
        </div>
      </Link>
      {!isAuth && <Navigate to="/" />}
    </div>
  );
};

export default Student;
