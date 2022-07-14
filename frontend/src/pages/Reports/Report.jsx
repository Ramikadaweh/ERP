import React from "react";
import "./Report.css";
import Report1 from "./Report1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { reports_links } from "./reports-links";
import Navbar from "../../Components/Navbar/Navbar";

function Report() {
  return (
    <div id="reports">
      {/* <Navbar /> */}
      {
        <div>
          <h1>Generate a Report</h1>
          <div className="reports-wrapper">
            {reports_links.map((item, index) => {
              return (
                <a href={item.link} key={index} className="report-card">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default Report;