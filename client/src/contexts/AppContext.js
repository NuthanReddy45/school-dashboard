import React, { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
const AppContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(localStorage.getItem("token"));
  const [Type, setType] = useState(null);
  const [StudentData, setStudentData] = useState([]);
  const [TeacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn) {
      setisAuth(tkn);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        Type,
        setType,
        setisAuth,
        StudentData,
        setStudentData,
        TeacherData,
        setTeacherData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
