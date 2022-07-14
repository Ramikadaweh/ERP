
import React, { useEffect, useState } from "react";
import './circle.css';
import deleteIcon from '../../images/deleteIcon.png'
import axios from "axios";

const CircularProgress = ({ skill, size, strokewidth, percentage, color }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokewidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <div id="emp_kpi_item">
    <div className="kpi_item">
      <h1 className="kpi_percentage">{skill}</h1>
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          fill="none"
          stroke="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokewidth}px`}
        />
        <circle
          fill="none"
          stroke={color}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokewidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash]}
          strokeLinecap="round"
          style={{ transition: "all 2s" }}
        />
        <text
          fill="#ccc"
          fontSize="2rem"
          x="50%"
          y="50%"
          dy="10px"
          textAnchor="middle"
        >
          {`${percentage}%`}
        </text>
      </svg>
      {/* <p>{percentage}%</p> */}
      {/* <div className="deleteIcon"> <img src={deleteIcon} alt="delete"  /></div> */}
    </div>
    </div>
  );
};
export default CircularProgress;