import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import Dashboard from "../layouts/Dashboard";

const Student = () => {
  const { StudentData, setStudentData, isAuth } = useApp();
  console.log("here = ", StudentData);

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
        console.log("stu data =  ", resp);
        setStudentData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  return (
    <>
      {StudentData.map((data) => {
        return <Dashboard {...data} key={data._id} />;
      })}
    </>
  );
};

export default Student;
