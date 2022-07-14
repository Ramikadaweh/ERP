import React from "react";
import "./admin.css";

const Admin = ({ name }) => {
  return (
    <div className="adminCard">
      <div className="adminss">
        <b>{name}</b>
      </div>
    </div>
  );
};

export default Admin;
