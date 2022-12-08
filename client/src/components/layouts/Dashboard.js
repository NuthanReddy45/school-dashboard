import React, { Fragment } from "react";

const Dashboard = ({
  name,
  rollNum,
  fatherName,
  subject,
  address,
  Class,
  phoneNum,
}) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">
            <small className="text-muted">{rollNum}</small>
            <small className="text-muted">{fatherName}</small>
            <small className="text-muted">{subject}</small>
          </p>
          <p className="card-text">
            {address} {phoneNum}
          </p>
          <div>
            {typeof Class === "number"
              ? Class
              : Class.map((i, idx) => <span key={idx}>{i}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
