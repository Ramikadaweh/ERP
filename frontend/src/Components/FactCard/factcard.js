import React from "react";
import "./factcard.css";

const FactCard = ({title}) => {
  return (
    <div className="factcard">
        <div className="employeee">
            <b>{title}</b>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
    </div>
  );
};

export default FactCard;