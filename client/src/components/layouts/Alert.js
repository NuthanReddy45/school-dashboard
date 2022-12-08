import React from "react";

const Alert = ({ msg, type }) => {
  <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
