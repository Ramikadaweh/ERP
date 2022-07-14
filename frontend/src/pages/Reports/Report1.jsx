import React, { useEffect, useState } from "react";
import plus from "./plus.png";
import back from "../../images/undo.jpg";
import axios from "axios";
import FetchUrl from "../../url";
import IndividualReport from "../../Components/IndividualReport/IndividualReport";
import OverallReport from "../../Components/OverallReport/OverallReport";
import ProjectReport from "../../Components/ProjectReport/ProjectReport";
function Report1(props) {

  let url = FetchUrl.fetchUrl;

  const [employees, setEmployee] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [kpis, setKpi] = useState([]);
  const [individualData, setIndividualdata] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [error, setError] = useState(false);


  // Individual_kpi
  async function handleChange(e) {
    const kpiRequest = await axios.get(`${url}/api/employee/${e.target.value}`);
    let kpiList = kpiRequest.data.data.kpi;
    setKpi(kpiList);
    setIndividualdata([]);
    setOverallData([]);
    setProjectData([]);
    setError(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(false)
    //Individual_kpi
    if (props.type === "Individual_kpi") {
      let employee_id = document.getElementById("select-employee");
      let kpi_id = document.getElementById("select-kpi");
      const { data: reportRes } = await axios.post(`${url}/api/history/search`, {
        employee_id: employee_id.value,
        kpi_id: kpi_id.value,
      });
      setIndividualdata(reportRes);
      if (reportRes.length == 0) { setError(true); return }
    }
    //Overall_KPI
    if (props.type === "Overall_KPI") {
      let employee_id = document.getElementById("select-employee");
      const employeeRes = await axios.get(`${url}/api/employee/${employee_id.value}`);
      let kpiList = employeeRes.data.data.kpi;
      setOverallData(kpiList);
      if (kpiList.length == 0) { setError(true); return }
    }
    //Projects report
    if (props.type === "project_report") {
      let employee_id = document.getElementById("select-employee");
      setEmployeeName(employee_id.options[employee_id.selectedIndex].innerText);
      const { data: ProjectList } = await axios.post(`${url}/api/project/test/history`, { "employee_id": employee_id.value });
      setProjectData(ProjectList);
      if (ProjectList.length == 0) { setError(true); return }
    }
    document.querySelector('#reports-result-section').scrollIntoView();
  }

  function getdata() {
    fetch(`${url}/api/employee`)
      .then((response) => response.json())
      .then((response) => {
        setEmployee(employees => employees = response.data);
        setKpi(response.data[0].kpi)
        // props.type === "Individual_kpi" && axios.get(`${url}/api/employee/${response.data[0].id}`).then(res => setKpi(res.data.data.kpi))
      })
      .catch((err) => console.log(err));
  }
  useEffect(getdata, []);

  return (
    <div id="report">
      <a href="/reports">
        <img src={back} alt="go back" />
        <h3>Go back</h3>
      </a>
      <form>
        <div className="first-container">
          <h1>{props.name}</h1>
          <p>{props.description}</p>
        </div>
        <div className="second-conatiner">
          <label>
            <h2>Choose employee *</h2>
            <select
              name="employees"
              id="select-employee"
              onChange={handleChange}
            >
              {employees.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.emp_first_name} {item.emp_last_name}
                  </option>
                );
              })}
            </select>
          </label>

          {props.type === "Individual_kpi" && (
            <label>
              <h2>Choose Kpi *</h2>
              <select name="kpi" id="select-kpi">
                {kpis.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.kpi_name}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          <div className="rep-emp">
            <button id="rep-employee" onClick={onSubmit}>
              <img src={plus} alt="Create Report" />
              <h3>Create Report</h3>
            </button>
          </div>
        </div>
      </form>
      <hr />
      <div style={{ marginTop: 50, paddingBottom: 50 }}>
        <h2 id="reports-result-section">Report Result</h2>
        {error && <div className="err" style={{ marginBottom: 20 }}>There is no data to show!</div>}
        {props.type === "Individual_kpi" && <IndividualReport data={individualData} />}
        {props.type === "Overall_KPI" && <OverallReport data={overallData} />}
        {props.type === "project_report" && <ProjectReport data={projectData} employee={employeeName} />}
      </div>
    </div>
  );
}

export default Report1;